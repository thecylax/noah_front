export type User = {
  id: number;
  username: string;
  email: string;
  groups: [string];
}

export async function Users({promise}: {promise: Promise<User[]>}) {
    const users = await promise

    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} | {user.email} | {user.groups}</li>
      ))}
      </ul>
    )
  }

// export async function UserForm({promise}: {promise: Promise<User>}) {

// }