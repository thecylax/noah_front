import { SetStateAction, useEffect, useState } from "react";
import { Schedule } from "../models/Schedule";
import { User } from "../models/User";
import ShowPlaylistModal from "./PlaylistModal";
import { Playlist } from "../models/Playlist";

export function Schedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [query, setQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]); // Array to track open items
  const [showModal, setShowModal] = useState(false);
  const [parameter, setParameter] = useState<Playlist | null>(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/api/schedule/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setSchedules(data.results.map((schedule: Schedule) => {
        return new Schedule(schedule.id, schedule.name, schedule.datetime, schedule.local, schedule.teams, schedule.playlist)
      })))
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    const firstMatchingItem = schedules.find(schedule =>
      schedule.teams.some(team =>
        team.members.some(member =>
          member.username.toLocaleLowerCase().includes(value.toLowerCase())
        )
      )
    );
    if (firstMatchingItem) {
      setOpenItems([firstMatchingItem.id]);
    } else {
      setOpenItems([]);
    }
  }

  const filterMembers = (members: User[]): User[] => {
    return members.filter(member =>
      member.username.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleClear = () => {
    setQuery('');
    setOpenItems([]);
  }

  const openModal = async (id_playlist: number) => {
    // Defina o parâmetro antes de abrir o modal, se necessário
    const apiUrl = `http://localhost:8000/api/playlists/${id_playlist}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setParameter(new Playlist(data.id, data.name, data.musics))
      )
    console.log(parameter)
    // setParameter();
    setShowModal(true);
  };

  const openModal2 = (id_playlist: number) => {
    const apiUrl = `http://localhost:8000/api/playlists/${id_playlist}`;
    console.log(apiUrl)
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (schedules.length === 0) {
    return <div>Carregando...</div>;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputFilter">
            <i className="bi bi-search"></i>
          </span>
          <input type="text" className="form-control" onChange={handleChange} placeholder="Filtrar por nome..." value={query} aria-label="nome" aria-describedby="inputFilter" />
          <button className="btn btn-primary" type="button" onClick={handleClear}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>

      <div className="container-fluid">
        <div id="accordion">
          {schedules.map(schedule => (
            <div className="card" key={schedule.id}>
              <div className="card-header" id={`heading-${schedule.id}`}>
                <h5 className="mb-0">
                  <button className="btn btn-light" data-bs-toggle="collapse" data-bs-target={`#panel-${schedule.id}`} aria-expanded="true" aria-controls="collapseOne" onClick={() => setOpenItems(openItems.includes(schedule.id) ? [] : [schedule.id])}>
                    {schedule.name} - {schedule.datetime.toLocaleDateString()}
                  </button>
                </h5>
              </div>

              <div id={`#panel-${schedule.id}`} className={`collapse${openItems.includes(schedule.id) ? ' show' : ''}`} aria-labelledby={`heading-${schedule.id}`} data-bs-parent="#accordion">
                <div className="card-body">
                  <div>
                    {schedule.playlist
                      ? <button className="btn btn-sm btn-primary" onClick={() => openModal(schedule.playlist)}>Visualizar Playlist</button>
                      : <button className="btn btn-sm btn-primary" disabled>Visualizar Playlist</button>
                    }
                  </div>
                  <div className="row">
                      {filterMembers(schedule.teams[0].members).map(member => (
                        <div className="col-md" key={member.id}>
                          <div className="card mt-2">
                            <h5 className="card-header h-100">
                              <p>
                                {/* <img src={`/images/${schedule.icon}`} /> */}
                              </p>
                              {member.role}
                            </h5>
                            <div className="card-body">
                              <h5 className="card-title">{member.username}</h5>
                              <p className="card-text">Some extra text.</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ShowPlaylistModal showModal={showModal} closeModal={closeModal} parameter={parameter} />
    </>
  )
}
