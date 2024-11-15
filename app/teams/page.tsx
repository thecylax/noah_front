'use client'

import useSWR from "swr";
import { useEffect, useState } from "react";
import { fetcher } from "../helpers/fetcher";
import { Team } from "../components/Team";
// import CreateTeamModal from "../modals/CreateTeamModal";
import { TeamModel } from "../types";
import Link from "next/link";

export default function Page() {
  const { data, error, isLoading } = useSWR<any>(`/data/teams/`, fetcher);
  const [teamData, setTeamData] = useState<TeamModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  }

  const filteredTeams = (teams: TeamModel[]): TeamModel[] => {
    return teams.filter(team =>
      team.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleClear = () => {
    setQuery('');
  };

  useEffect(() => {
    if (data && data.result.results) {
      setTeamData(data.result.results)
    }
  }, [data, isLoading]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // const MusicControlsContext = createContext<[() => void, () => void]>([
  //   () => console.log('No add music function provided'),
  //   () => console.log('No remove music function provided'),
  // ]);

  // const useMusicControlsContext = () => {
  //   return useContext(MusicControlsContext)
  // };

  // const addMusic = () => {
  //   const lastMusic = musicData[musicData.length - 1];
  //   const id = lastMusic ? lastMusic.id : 1;
  //   fetcher(`/data/musics/${id}/`).then((m) => {
  //     setMusicData((oldMusic) => [...oldMusic, m]);
  //   })
  // };

  // const removeMusic = () => {
  //   setMusicData((oldMUsic) => {
  //     const newArr = [...oldMUsic];
  //     newArr.pop();
  //     return newArr;
  //   });
  // };

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
      <>
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
      </>
    )
  }

  if (!data) return null;

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link className="text-light " href="/" passHref>Início</Link></li>
          <li className="breadcrumb-item text-light" aria-current="page">Louvor</li>
          <li className="breadcrumb-item active text-light" aria-current="page">Músicas</li>
        </ol>
      </nav>

      <div className="d-flex w-100 justify-content-between">
        <span></span>
        <button type="button" className="btn btn-primary mb-2" onClick={openModal}>Adicionar</button>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="inputFilter">
          <i className="bi bi-search"></i>
        </span>
        <input type="text" className="form-control" onChange={handleChange} placeholder="Filtrar por nome..." value={query} aria-label="nome" aria-describedby="inputFilter" autoFocus />
        <button className="btn btn-primary" type="button" onClick={handleClear}>
          <i className="bi bi-x"></i>
        </button>
      </div>

      <div className="list-group">
        {filteredTeams(teamData).map((team: TeamModel) => (
          <Team key={team.id} editable={true} team={team} />
        ))}
      </div>

      {/* <CreateTeamModal showModal={showModal} closeModal={closeModal} teamId={0} /> */}
    </>
  )
}
