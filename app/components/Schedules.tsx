import { SetStateAction, useEffect, useState } from "react";
import ShowPlaylistModal from "./PlaylistModal";

import useSWR from 'swr';
import { fetcher } from "../helpers/fetcher";
import { PlaylistModel, ScheduleModel, UserModel } from "../types";
import { PlaylistModal } from "../modals/PlaylistModal";

export function Schedules() {
  const [schedulesData, setSchedulesData] = useState<ScheduleModel[]>([]);
  const [query, setQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]); // Array to track open items
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [parameter, setParameter] = useState<PlaylistModel | null>(null);
  const [schedule, setSchedule] = useState<ScheduleModel>();
  const { data: schedules, error, isLoading } = useSWR<any>(`/data/schedule/`, fetcher);
  const [errorToast, setErrorToast] = useState(false);

  useEffect(() => {
    if (schedules && schedules.result.results) {
      setSchedulesData(schedules.result.results)
    }
    console.log(schedules);
  }, [schedules, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    const matchingItems = schedulesData.filter(schedule =>
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

  const filterMembers = (members: UserModel[]): UserModel[] => {
    return members.filter(member =>
      member.username.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleClear = () => {
    setQuery('');
    setOpenItems([]);
  }

  const openModal = async (id_playlist: number) => {
    const apiUrl = `/data/playlist/${id_playlist}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setParameter(data))
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModalEdit(false);
  };

  const openPlaylistModal = async (schedule: ScheduleModel) => {
    if (schedule.playlist != null) {
      const apiUrl = `/data/playlist/${schedule.playlist}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setParameter(data))
    }
    else {
      setParameter((prev) => ({
        ...prev,
        id: 0,
        name: schedule.name,
        spotify_link: "",
        musics: [],
        schedule: schedule
      }));
    }
    setSchedule(schedule);
    setShowModalEdit(true);
  };

  if (error) return (
    <>
      <div className="container w-100 rounded-3 bg-light bg-opacity-50">
        <div className="text-center p-4">
          <h1 className="text-danger bi-x-circle-fill"></h1>
          <h4 className="text-danger mt-3">Erro ao carregar os dados</h4>
          <p className="mt-3">Tente novamente mais tarde</p>
        </div>
      </div>
    </>
  );

  if (isLoading) {
    return (
      <div className="card-body">

        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-8"></span>
        </p>
      </div>
    )
  };

  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputFilter">
          <i className="bi bi-search"></i>
        </span>
        <input type="text" className="form-control" onChange={handleChange} placeholder="Filtrar por nome..." value={query} aria-label="nome" aria-describedby="inputFilter" />
        <button className="btn btn-primary" type="button" onClick={handleClear}>
          <i className="bi bi-x"></i>
        </button>
      </div>

      <div className="accordion">
        {schedulesData.map(schedule => (
          <div className="accordion-item bg-light bg-opacity-50" key={schedule.id}>
            <div className="accordion-header">
              <button className="accordion-button bg-light bg-opacity-50" type="button" data-bs-toggle="collapse" data-bs-target={`#panel-${schedule.id}`} aria-expanded="true" aria-controls={`panel-${schedule.id}`}>
                {schedule.name} - {new Date(schedule.datetime).toLocaleDateString()}
              </button>
            </div>
            <div id={`panel-${schedule.id}`} className={`accordion-collapse collapse ${openItems.includes(schedule.id) ? ' show' : ''}`} aria-labelledby={`heading-${schedule.id}`}>
              <div className="accordion-body">
                <div className="d-flex w-100 justify-content-between">
                  {schedule.playlist
                    ? <button className="btn btn-sm btn-primary" onClick={() => openModal(schedule.playlist)}>Visualizar Playlist</button>
                    : <button className="btn btn-sm btn-primary" disabled>Visualizar Playlist</button>
                  }
                  <div className="btn-group">
                    <button className="btn btn-outline-secondary btn-sm dropdown-toggle text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi-pencil"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => openPlaylistModal(schedule)}>Editar Escala</button></li>
                      <li><button className="dropdown-item" onClick={() => openPlaylistModal(schedule)}>Editar Playlist</button></li>
                      {/* <li><a className="dropdown-item" href={`/data/playlist/${schedule.teams[0].id}`}>Editar Equipe</a></li> */}
                    </ul>
                  </div>
                </div>
                <div className="row">
                  {filterMembers(schedule.teams[0].members).map(member => (
                    <div className="col-md" key={member.id}>
                      <div className="card mt-2 bg-light bg-opacity-50">
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

      <ShowPlaylistModal showModal={showModal} closeModal={closeModal} parameter={parameter} />
      <PlaylistModal showModal={showModalEdit} closeModal={closeModal} editable={true} playlist={parameter} schedule={schedule} />
    </>
  )
}
