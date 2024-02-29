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
        const apiUrl = 'http://localhost:8000/api/users/';

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => setData(data.results.map((user: User) => {
            return new User(user.id, user.username, user.email, user.groups, user.role)
          })))
          .catch((error) => console.error('Failed to fetch users:', error));
    }, []);

    return (
        <>
            <div className="container-fluid pb-3">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addScheduleModal">Adicionar</button>
            </div>

            {/* Modal */}
            <div className="modal fade" id="addScheduleModal" tabIndex={-1} role="dialog" aria-labelledby="addScheduleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addScheduleModalLabel">Criar nova escala</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">@</span>
                                    <input type="text" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon2"><i className="bi bi-calendar"></i></span>
                                    {/* <input type="text" className="form-control" placeholder="Data" aria-label="Autor" aria-describedby="basic-addon2" /> */}
                                    <MyDatePicker />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3"><i className="bi bi-map"></i></span>
                                    <input type="text" className="form-control" placeholder="Local" aria-label="Spotify" aria-describedby="basic-addon3" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon4"><i className="bi bi-person-add"></i></span>
                                    <select id="inputState" className="form-control" onChange={handleChange}>
                                        <option selected>Escolha...</option>
                                        {datax.map((user) => (
                                            <option key={user.id} value={user.id.toString()}>{user.id} {user.username}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>

            <Schedules />
        </>
    )
}