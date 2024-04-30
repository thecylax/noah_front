"use client";

import { fetcher } from '@/app/helpers/fetcher';
import { UserModel } from '@/app/types';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import useSWR from 'swr';

export default function TeamF(props: any) {
  const { data, handleChange } = props;
  const [usersData, setUserData] = useState<UserModel[]>([]);
  const { data: users, error, isLoading } = useSWR<any>(`/data/users/`, fetcher);

  useEffect(() => {
    if (users && users.result.results) {
      setUserData(users.result.results)
    }
  }, [data, isLoading]);

  const options = usersData.map((user: UserModel) => ({
    label: user.username,
    value: user.id
  }));

  const roles = [
    'ministro', 'back_1', 'back_2', 'guitarra', 'baixo', 'bateria', 'teclado', 'sonoplasta'
  ]

  return (
    <>
      {roles.map(role => (
        <div className="input-group mb-3" key={roles.indexOf(role)}>
          <span className="input-group-text w-25">{(role[0].toUpperCase() + role.substring(1)).replace('_', ' ')}</span>
          <Select
            name={`team_members_${role}`}
            options={options}
            className="form-control p-0"
            isClearable={true}
            isSearchable={true}
            defaultValue={data[`team_members_${role}`]}
            onChange={handleChange}
          />
        </div>
      ))}
    </>
  )
}
