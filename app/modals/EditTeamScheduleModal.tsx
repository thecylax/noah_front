import { useEffect, useState } from 'react';
import Select from 'react-select';
import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';
import { roles } from '../helpers/utils';
import { ScheduleModel, UserModel } from "../types";


interface MyModalProps {
  showModal: boolean;
  closeModal: () => void;
  scheduleData: ScheduleModel;
}

interface member {
  label: string;
  value: number;
}

type State = Record<string, member | null>;

export function TeamScheduleModal({ showModal, closeModal, scheduleData }: MyModalProps) {
  const populateForm = () => {
    const members = scheduleData?.teams[0]?.members || [];
    const initialTeam = roles.reduce((acc, role) => {
      const member = members.find(m => m.role.toLowerCase().replace(' ', '_') === role);
      if (member) {
        acc[`team_members_${role}`] = {
          label: member?.username || '',
          value: member?.id || 0,
        };
      } else {
        acc[`team_members_${role}`] = null;
      }
      return acc;
    }, {} as State);
    return initialTeam;
  }

  const [schedule, setSchedule] = useState<ScheduleModel>(scheduleData);
  const [usersData, setUserData] = useState<UserModel[]>([]);
  const [teamForm, setTeamForm] = useState<State>(populateForm())

  const { data: users, error, isLoading } = useSWR<any>(`/data/users/`, fetcher);
  const modalClass = showModal ? 'modal fade show' : 'modal fade';

  useEffect(() => {
    setSchedule(scheduleData);
  }, [scheduleData]);

  const populateForm2 = () => {
    const members = schedule.teams[0].members || [];
    const initialTeam = roles.reduce((acc, role) => {
      const member = members.find(m => m.role.toLowerCase().replace(' ', '_') === role);
      if (member) {
        acc[`team_members_${role}`] = {
          label: member?.username || '',
          value: member?.id || 0,
        };
      } else {
        acc[`team_members_${role}`] = null;
      }
      return acc;
    }, {} as State);
    return initialTeam;
  }

  useEffect(() => {
    if (schedule.teams.length > 0) {
      setTeamForm(populateForm2());
    }
  }, [schedule]);

  useEffect(() => {
    if (users && users.result.results) {
      setUserData(users.result.results)
    }
  }, [users, isLoading]);

  const handleChange = (e: any, meta: any) => {
    const { action, option, name } = meta;
    console.log(teamForm);
    if (action == 'clear') {
      setTeamForm({
        ...teamForm,
        [name]: null
      })
    }
    if (e instanceof Object) {
      setTeamForm({
        ...teamForm,
        [name]: e,
      })
    }
  };

  const resetForm = () => {
    setTeamForm(populateForm())
  }

  const closeModalX = () => {
    resetForm();
    closeModal();
  };

  const formatTeam = () => {
    const payload = {
      "members": Object.entries(teamForm).filter(([key, item]) => item !== null).map(([key, item]) => ({
        role: (() => {
          const role = key.replace('team_members_', '').replace('_', ' ');
          return role.charAt(0).toUpperCase() + role.slice(1)
        })(),
        user: item?.value
      })),
      "name": schedule.teams[0].name,
      "ministry": schedule.teams[0].ministry
    }

    return payload;
  };

  const saveSchedule = async (e: any) => {
    e.preventDefault()
    const formData = formatTeam();
    try {
      const res = await fetch(`/data/teams/${schedule.teams[0].id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        console.log('Erro ao salvar team');
        console.log(await res.text());
      } else {
        const team = await res.json();
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
    closeModalX();
  }

  const options = usersData.map((user: UserModel) => ({
    label: user.username,
    value: user.id
  }));

  const isButtonDisabled = (): boolean => {
    return Object.values(teamForm).every(
      (item) => item === null || item === undefined
    );
  };

  return (
    <div className={modalClass} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark bg-opacity-50">
            <h5 className="modal-title text-white">
              <div>
                Equipe
              </div>
            </h5>
            <button type="button" className="btn btn-close" aria-label="Close" onClick={closeModalX} />
          </div>
          <div className="modal-body">
            {roles.map(role => (
              <div className="input-group mb-3" key={roles.indexOf(role)}>
                <span className="input-group-text w-25">{(role[0].toUpperCase() + role.substring(1)).replace('_', ' ')}</span>
                <Select
                  name={`team_members_${role}`}
                  options={options}
                  className="form-control p-0"
                  isClearable={true}
                  isSearchable={true}
                  value={teamForm[`team_members_${role}`]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="modal-footer bg-dark bg-opacity-50">
            <button type="button" className="btn btn-secondary" onClick={closeModalX}>Fechar</button>
            <button type="button" className="btn btn-primary" disabled={isButtonDisabled()} onClick={saveSchedule}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
