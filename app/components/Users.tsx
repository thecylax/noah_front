import { useEffect, useState } from "react";
import { User } from "../models/User";

export function Users() {
  const [usersData, setUserData] = useState([]);
  
  useEffect(() => {
    const apiUrl = 'http://localhost:8000/users/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>  setUserData(data.results.map((user: User) => {
        return new User(user.id, user.username, user.email, user.groups)
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
// export async function Users({promise}: {promise: Promise<User[]>}) {
//     const users = await promise

//     return (
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.username} | {user.email} | {user.groups}</li>
//       ))}
//       </ul>
//     )
//   }

// export async function UserForm({promise}: {promise: Promise<User>}) {

// }