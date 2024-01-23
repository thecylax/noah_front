import { useEffect, useState } from "react";
import { Team } from "../models/Team";

export function Teams() {
  const [teamsData, setTeamData] = useState([]);
  
  useEffect(() => {
    const apiUrl = 'http://localhost:8000/teams/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>  setTeamData(data.results.map((team: Team) => {
        return new Team(team.id, team.name, team.ministry, team.members)
      })))
      .catch((error) => console.error('Failed to fetch users:', error));
  }, []);

  if (teamsData.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ul className="list-group">
        {teamsData.map((team: Team) => (
          <li key={team.id} className="list-group-item">
            {team.id} | {team.name} | {team.ministry.name} | Members: {team.members.map(member => member.username).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
}
