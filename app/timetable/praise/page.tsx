'use client'

import { MyDatePicker } from "@/app/components/DatePicker"
import { Schedules } from "@/app/components/Schedules"
import { User } from "@/app/models/User";
import { parse } from "path";
import { SetStateAction, useEffect, useState } from "react";

export default function Page() {
    const [datax, setData] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    // const handleChange = (e: { target: { value: SetStateAction<number>; }; }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue === '') {
            setSelectedUserId(null);
        } else {
            setSelectedUserId(parseInt(selectedValue, 10));
        }
        console.log(e.target);
        console.log(e.target.value);
        console.log(selectedUserId);
    }

    useEffect(() => {
        const apiUrl = 'http://localhost/api/users/';

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => setData(data.results.map((user: User) => {
            return new User(user.id, user.username, user.email, user.groups, user.role)
          })))
          .catch((error) => console.error('Failed to fetch users:', error));
    }, []);

    return (
        <>
            <Schedules />
        </>
    )
}