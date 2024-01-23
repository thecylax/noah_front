import { useEffect, useState } from "react";
import { Schedule } from "../models/Schedule";
import { User } from "../models/User";
import { Team } from "../models/Team";

export function Schedules() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const apiUrl = 'http://localhost:8000/schedule/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>  setData(data.results.map((schedule: Schedule) => {
        return new Schedule(schedule.id, schedule.name, schedule.datetime, schedule.local, schedule.teams)
      })))
      .catch((error) => console.error('Failed to fetch users:', error));
  }, []);

  if (data.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {data.map((schedule: Schedule) => (
        <div className="card">
          <div className="card-header">{schedule.datetime.toLocaleString()}</div>
          <div className="card-body">
            <h5 className="card-title">{schedule.name}</h5>
            {schedule.teams.map((team: Team) => (
              <div key={team.id}>
                <p className="card-text">{team.name}</p>
                {team.members.map((member: User) => (
                  <p className="card-text" key={member.id}>{member.username}</p>
                ))}
              </div>
            ))}
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      ))}
    </div>
  )
}
