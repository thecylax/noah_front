'use client'

import { Suspense, useState } from "react"
import { User, Users } from "../components/Users"

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
async function getData() {
  const res = await fetch('http://127.0.0.1:8000/users/')
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function createUser(newUser:any) {
  const res = await fetch('http://127.0.0.1:8000/users/', {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {"Content-Type": "application/json"},
  })

  if (!res.ok) {
    throw new Error('Failed to create data')
  }

  return res.json()
}

export default async function Page() {
  // const usersData = await getData()
  // const [users] = await Promise.all([usersData])
  // const userCreate = await createUser()
  // const userc = await Promise.all([userCreate])

  // const [users2, setusers2] = useState([])
  // const [newUser, setNewUser] = useState({
  //   user: '',
  // })

  function handleSubmit(e:any) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    }
    const resp = createUser(data)
    console.log(resp)
  }

  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Users promise={usersData} />
      </Suspense> */}
      <p>Oi</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" name="foo" required />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="foo" required />
        <label htmlFor="password">Senha</label>
        <input type="text" id="password" name="foo" required />

        <button type="submit">Enviar</button>
      </form>
    </>
  )
}
