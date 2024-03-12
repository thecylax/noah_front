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
    const apiUrl = 'http://168.75.95.7/api/schedule/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setSchedules(data.results.map((schedule: Schedule) => {
        return new Schedule(schedule.id, schedule.name, schedule.datetime, schedule.local, schedule.teams, schedule.playlist)
      })))
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    const matchingItems = schedules.filter(schedule =>
      schedule.teams.some(team =>
          team.members.some(member =>
              member.username.toLocaleLowerCase().includes(value.toLowerCase())
          )
      )
    );
    if (matchingItems.length > 0) {
      const matchingItemIds = matchingItems.map(item => item.id);
      setOpenItems(matchingItemIds);
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
    const apiUrl = 'http://168.75.95.7/api//playlists/${id_playlist}';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setParameter(new Playlist(data.id, data.name, data.musics))
      )
    console.log(parameter)
    // setParameter();
    setShowModal(true);
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
        <div className="accordion">
          {schedules.map(schedule => (
            <div className="accordion-item" key={schedule.id}>
              <div className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panel-${schedule.id}`} aria-expanded="true" aria-controls={`panel-${schedule.id}`}>
                  {schedule.name} - {schedule.datetime.toLocaleDateString()}
                </button>
              </div>
              <div id={`panel-${schedule.id}`} className={`accordion-collapse collapse ${openItems.includes(schedule.id) ? ' show' : ''}`} aria-labelledby={`heading-${schedule.id}`}>
                <div className="accordion-body">
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
                            {member.role}
                          </h5>
                          <div className="card-body">
                            <h5 className="card-title">{member.username}</h5>
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
