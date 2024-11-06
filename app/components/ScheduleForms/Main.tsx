"use client";

import { roles } from '@/app/helpers/utils';
import { useState } from 'react';
import PlaylistF from './PlaylistForm';
import ScheduleF from './ScheduleForm';
import TeamF from './TeamForm';

interface MainFormProps {
  closeModal: () => void;
}

const MainForm: React.FC<MainFormProps> = ({ closeModal }) => {
  interface member {
    name: string;
    value: number
  }

  interface State {
    playlist_id: number;
    playlist_name: string;
    playlist_musics: any[];
    playlist_spotify: string;
    team_id: number;
    team_name: string;
    team_members_ministro: member;
    team_members_back_1: member;
    team_members_back_2: member;
    team_members_guitarra: member;
    team_members_baixo: member;
    team_members_bateria: member;
    team_members_teclado: member;
    team_members_sonoplasta: member;
    schedule_id: number;
    schedule_name: string;
    schedule_datetime: Date;
    schedule_teams: any[];
    schedule_local: string;
  };

  const [data, setData] = useState<State>({
    playlist_id: 0,
    playlist_name: "",
    playlist_musics: [],
    playlist_spotify: "",
    team_id: 0,
    team_name: "",
    team_members_ministro: {name: '', value: 0},
    team_members_back_1: {name: '', value: 0},
    team_members_back_2: {name: '', value: 0},
    team_members_guitarra: {name: '', value: 0},
    team_members_baixo: {name: '', value: 0},
    team_members_bateria: {name: '', value: 0},
    team_members_teclado: {name: '', value: 0},
    team_members_sonoplasta: {name: '', value: 0},
    schedule_id: 0,
    schedule_name: "",
    schedule_datetime: new Date(),
    schedule_teams: [], // geralmente só uma equipe
    schedule_local: "",
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: any, meta: any) => {
    if (event == null) {
      return
    }
    if (event.target) {
      const { name, value } = event.target;
      setData({
        ...data,
        [name]: value,
      });
    }
    else if (event instanceof Array) {
      setData({
        ...data,
        playlist_musics: event,
      })
    } else if (event instanceof Date){
      setData({
        ...data,
        schedule_datetime: event,
      })
    } else if (event instanceof Object) {
      const { action, option, name } = meta;
      setData({
        ...data,
        [name]: event,
      })
    }
  };

  const resetData = () => {
    setData({
      playlist_id: 0,
      playlist_name: "",
      playlist_musics: [],
      playlist_spotify: "",
      team_id: 0,
      team_name: "",
      team_members_ministro: { name: '', value: 0 },
      team_members_back_1: { name: '', value: 0 },
      team_members_back_2: { name: '', value: 0 },
      team_members_guitarra: { name: '', value: 0 },
      team_members_baixo: { name: '', value: 0 },
      team_members_bateria: { name: '', value: 0 },
      team_members_teclado: { name: '', value: 0 },
      team_members_sonoplasta: { name: '', value: 0 },
      schedule_id: 0,
      schedule_name: "",
      schedule_datetime: new Date(),
      schedule_teams: [],
      schedule_local: "",
    });
  };

  const close = () => {
    resetData();
    setActiveTab(0);
    closeModal();
  }

  const formElements = [
    <PlaylistF key={data.playlist_id} data={data} handleChange={handleChange} />,
    <TeamF key={data.team_id} data={data} handleChange={handleChange} />,
    <ScheduleF key={data.schedule_id} data={data} handleChange={handleChange} />
  ];

  const calcProgress = () => {
    return Math.floor((activeTab / (formElements.length - 1) * 100) / 25) * 25;
  };

  const formatPlaylist = () => {
    const payload = {
      "name": data.schedule_name,
      "spotify_link": data.playlist_spotify,
      "musics": data.playlist_musics?.map(m => m.value),
    }

    return payload;
  };

  const formatTeam = () => {
    const payload = {
      "name": data.schedule_name,
      "members": roles.map(member => {
        const userData = data[`team_members_${member}` as keyof State];
        if (typeof userData === 'object' && 'value' in userData) {
          return userData.value !==0 ? {user: userData.value, role: member.charAt(0).toUpperCase() + member.slice(1).replace('_', ' ')} : null;
        }
      }).filter(member => member !== null),
      "ministry": 1
    }

    return payload;
  };

  const formatSchedule = (teamId: number, playlistId: number) => {
    const payload = {
      "name": data.schedule_name,
      "datetime": data.schedule_datetime,
      "teams": [teamId],
      "local": data.schedule_local,
      "playlist": playlistId && playlistId || null
    }

    return payload;
  };

  const saveData = async (e: any) => {
    let playlistId = 0;
    let teamId = 0;
    let scheduleId = 0;
    e.preventDefault()
    if (data.playlist_musics.length != 0 && data.schedule_name) {
      const formData = formatPlaylist();
      try {
        const res = await fetch('/data/playlist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const playlistData = await res.json();
        playlistId = playlistData.id;
      } catch (error) {
          console.error('Ocorreu um erro:', error);
      };
    };
    if (data.team_members_ministro.value != 0 && data.schedule_name) {
      const formData = formatTeam();
      try {
        const res = await fetch('/data/teams/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const teamData = await res.json();
        teamId = teamData.id;
      } catch (error) {
        console.error('Ocorreu um erro:', error);
      };
    };
    if (data.schedule_name) {
      const formData = formatSchedule(teamId, playlistId);
      try {
        const res = await fetch('/data/schedule/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const scheduleData = await res.json();
        setData({
          ...data,
          schedule_id: scheduleData.id,
        })
      } catch (error) {
        console.error('Ocorreu um erro:', error);
      };
    };
    close();
  }

  return (
    <>
      <div>
        <div className="progress mb-2 h-3" role="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={calcProgress()}>
          <div className={`progress-bar progress-bar-striped progress-bar-animated bg-success w-${calcProgress()}`}></div>
        </div>
        {formElements[activeTab]}
      </div>
      <div className="modal-footer">
        <button
          onClick={close}
          className="btn btn-danger">
            Cancelar
        </button>
        <button
          disabled={activeTab === 0 ? true : false}
          onClick={() => setActiveTab(prev => prev - 1)}
          className="btn btn-secondary bi bi-arrow-left-short">
            Voltar
        </button>
        {
          activeTab <= formElements.length - 2 ?
            <button
              onClick={() => setActiveTab(prev => prev + 1)}
              className="btn btn-primary">Próximo<i className='bi bi-arrow-right-short' />
            </button> :
          null
        }
        {
          activeTab === formElements.length - 1 ? <button className='btn btn-success' onClick={saveData}>Salvar</button> : null
        }
      </div>
    </>
  )
}

export default MainForm;