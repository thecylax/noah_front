import { useEffect, useState } from "react";
import { User } from "../models/User";

export function Users() {
  const [usersData, setUserData] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_APIURL}/users/`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>  setUserData(data.results.map((user: User) => {
        return new User(user.id, user.username, user.email, user.groups, user.role)
      }))) //setUserData(data.results))
      .catch((error) => console.error('Failed to fetch users:', error));
  }, []);

  // const users: User[] = usersData.map((userD))
  if (usersData.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ul className="list-group">
        {usersData.map((user: User) => (
          <li key={user.id} className="list-group-item">
            {user.username} | {user.email}
          </li>
        ))}
      </ul>
      {/* {user.groups.map} */}
    </div>
  )
}
