'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetcher } from '../helpers/fetcher';
import Select from 'react-select';
import useSWR from 'swr';
import { TeamModel, UserModel } from '../types';
import { captureRejectionSymbol } from 'events';

interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  teamId: number;
}

interface imember {
  name: string;
  value: number
}

interface State {
  team_member_ministro: imember;
  team_member_back_1: imember;
  team_member_back_2: imember;
  team_member_guitarra: imember;
  team_member_baixo: imember;
  team_member_bateria: imember;
  team_member_teclado: imember;
  team_member_sonoplasta: imember;
};

const CreateTeamModal = ({ showModal, closeModal, teamId }: MyModalProps) => {
  const modalClass = showModal ? 'modal fade show' : 'modal fade';
  const { data: users, error: usersError, isLoading: usersLoading } = useSWR<any>(`/data/users/`, fetcher);
  const { data: teamData, error: teamError, isLoading: teamLoading } = useSWR<any>(teamId ? `/data/teams/${teamId}/` : null, fetcher);

  const [name, setName] = useState<string>('');
  const [team, setTeam] = useState<TeamModel | null>(null)

  const [usersData, setUserData] = useState<UserModel[]>([]);
  const [memberRole, setMemberRole] = useState<State>({
    team_member_ministro: { name: '', value: 0 },
    team_member_back_1: { name: '', value: 0 },
    team_member_back_2: { name: '', value: 0 },
    team_member_guitarra: { name: '', value: 0 },
    team_member_baixo: { name: '', value: 0 },
    team_member_bateria: { name: '', value: 0 },
    team_member_teclado: { name: '', value: 0 },
    team_member_sonoplasta: { name: '', value: 0 }
  });

  useEffect(() => {
    if (teamId && teamData) {
      setTeam(teamData)
    }
    if (users && users.result.results) {
      setUserData(users.result.results)
    }
  }, [teamData, users, teamLoading, usersLoading]);

  const options = usersData.map((user: UserModel) => ({
    label: user.username,
    value: user.id,
    role: ''
  }));

  const loadedOptions = team?.members.map((user: UserModel) => ({
    label: user.username,
    value: user.id,
    role: user.role
  }));

  const closeModal2 = () => {
    closeModal();
    clearFields();
  }

  const clearFields = () => {
    setName('');
    // setSinger('');
    // setYTLink('');
    // setCCLink('');
  }

  const formatTeam = () => {
    const payload = {
      "name": team?.name,
      "members": roles.map(member => {
        const userData = memberRole[`team_member_${member}` as keyof State];
        if (typeof userData === 'object' && 'value' in userData) {
          return userData.value !== 0 ? { user: userData.value, role: member.charAt(0).toUpperCase() + member.slice(1).replace('_', ' ') } : null;
        }
      }).filter(member => member !== null),
      "ministry": 1
    }

    return payload;
  };

  const saveTeam = async (e: any) => {
    console.log(e)
    e.preventDefault()
    let res = null;
    if (teamId) {
      res = await fetch(`/data/teams/${teamId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    } else if (team?.name) {
      const formData = formatTeam();
      try {
        const res = await fetch('/data/teams/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const teamResponse = await res.json();  // Resposta do POST
      } catch (error) {
        console.error('Ocorreu um erro:', error);
      };
      closeModal();
      clearFields();
    }
  };

  const handleChange = (event: any) => {
    console.log(event)
    // if (event == null) {
    //   return
    // }
    // if (event.target) {
    //   const { name, value } = event.target;
    //   setData({
    //     ...data,
    //     [name]: value,
    //   });
    // }
    // (e: any) => setTeam({...team, name: e.target.value})
  }

  const roles = [
    'ministro', 'back_1', 'back_2', 'guitarra', 'baixo', 'bateria', 'teclado', 'sonoplasta'
  ]

  // const roles2 = [
  //   {label: 'Ministro', value: 0},
  //   {label: 'Back 1', value: 1},
  //   {label: 'Back 2', value: 2},
  //   {label: 'Guitarra', value: 3},
  //   {label: 'Baixo', value: 4},
  //   {label: 'Bateria', value: 5},
  //   {label: 'Teclado', value: 6},
  //   {label: 'Sonoplasta', value: 7},
  // ]

  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark bg-opacity-50">
            {teamId
              ? <h5 className="modal-title text-white">Editar Equipe {name}</h5>
              : <h5 className="modal-title text-white">Adicionar Equipe</h5>
            }
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModal} />
          </div>

          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="addon-wrapping">@</span>
              <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="addon-wrapping" value={team?.name} onChange={handleChange} />
            </div>

            {loadedOptions?.map(member => (
              <div className="input-group mb-3" key={member.value}>
                <span className="input-group-text w-25">{member.role}</span>
                <Select
                  name={`team_member_${member.role.toLowerCase()}`}
                  options={options}
                  className="form-control p-0"
                  isClearable={true}
                  isSearchable={true}
                  defaultValue={member}
                  onChange={handleChange}
                />
              </div>
            ))}

            {roles.map(role => (
              <div className="input-group mb-3" key={roles.indexOf(role)}>
                <span className="input-group-text w-25">{(role[0].toUpperCase() + role.substring(1)).replace('_', ' ')}</span>
                {/* <Select
                  name={`role_${roles.indexOf(role)}`}
                  options={roles2}
                  className='form-control p-0'
                  isClearable={true}
                  isSearchable={true}
                /> */}
                <Select
                  name={`team_members_${role}`}
                  options={options}
                  className="form-control p-0"
                  isClearable={true}
                  isSearchable={true}
                  // defaultValue={teamData[`team_members_${role}`]}
                  onChange={handleChange}
                />
              </div>
            ))}

          </div>

          <div className="modal-footer bg-dark bg-opacity-50">
            <button type="button" className="btn btn-secondary" onClick={closeModal2}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary" onClick={saveTeam}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;
