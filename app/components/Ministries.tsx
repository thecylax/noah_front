import { useEffect, useState } from "react";
import { Ministry } from "../models/Ministry";

export function Ministries() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_APIURL}/ministries/`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>  setData(data.results.map((ministry: Ministry) => {
        return new Ministry(ministry.id, ministry.name, ministry.users)
      })))
      .catch((error) => console.error('Failed to fetch users:', error));
  }, []);

  if (data.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ul className="list-group">
        {data.map((ministry: Ministry) => (
          <li key={ministry.id} className="list-group-item">
            {ministry.name} | {ministry.users.map(user => user.username).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
}
