'use client'

import { Suspense, useState } from "react"
import { User, Users } from "../components/Users"

// async function getData() {
//   const res = await fetch('http://127.0.0.1:8000/users/')
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

async function getData() {
  return {}
}

export default async function Page() {
  const usersData = await getData()
  // const [users] = await Promise.all([usersData])
  // const userCreate = await createUser()
  // const userc = await Promise.all([userCreate])

  // const [users, setusers] = useState([])
  // const [newUser, setNewUser] = useState({
  //   user: '',
  // })

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Users promise={usersData.results} /> */}
      </Suspense>
    </>
  )
}
