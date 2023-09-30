'use client'

import { SetStateAction, useState } from "react"

export default function Page() {
    const [query, setQuery] = useState('');
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setQuery(e.target.value);
    }
    const members = [
        {"id": 1, "name": "Eliel", "function": "Ministro", "icon": "people.png"},
        {"id": 2, "name": "Iasmini", "function": "Vocal", "icon": "mic.png"},
        {"id": 3, "name": "Anna C.", "function": "Vocal", "icon": "mic.png"},
        {"id": 4, "name": "Uanderson", "function": "Teclado", "icon": "keyboard.png"},
        {"id": 5, "name": "Gegê", "function": "Baixo", "icon": "guitar.png"},
        {"id": 6, "name": "Gabriel", "function": "Bateria", "icon": "drums.png"},
        {"id": 7, "name": "Samuel", "function": "Sonoplastia", "icon": "slider.png"},
    ]

    const searchFilter = (array: any[]) => {
        return array.filter(
            (el) => el.name.toLowerCase().includes(query)
        )
    }
    const filtered = searchFilter(members)

    return (
        <>
            <div className="container-fluid">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputFilter">
                        <i className="bi bi-search"></i>
                    </span>
                    <input type="text" className="form-control" onChange={handleChange} placeholder="Filtrar por nome..." aria-label="nome" aria-describedby="inputFilter"/>
                </div>

                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                23 Julho
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="row">
                                    {filtered.map((member) => (
                                        <div className="col" key={member.id}>
                                            <div className="card mt-2">
                                                <h5 className="card-header h-100">
                                                    <p><img src={`/images/${member.icon}`} /></p>
                                                    {member.function}
                                                </h5>
                                                <div className="card-body">
                                                    <h5 className="card-title">{member.name}</h5>
                                                    <p className="card-text">Some extra text.</p>
                                                    {/* <a href="" className="btn btn-primary">Go somewhere</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            30 Julho
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <div className="row">
                                    {filtered.map((member) => (
                                        <div className="col" key={member.id}>
                                            <div className="card mt-2">
                                                <h5 className="card-header h-100">
                                                    <p><img src={`/images/${member.icon}`} /></p>
                                                    {member.function}
                                                </h5>
                                                <div className="card-body">
                                                    <h5 className="card-title">{member.name}</h5>
                                                    <p className="card-text">Some extra text.</p>
                                                    {/* <a href="" className="btn btn-primary">Go somewhere</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            06 Agosto
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <div className="row">
                                    {filtered.map((member) => (
                                        <div className="col" key={member.id}>
                                            <div className="card mt-2">
                                                <h5 className="card-header h-100">
                                                    <p><img src={`/images/${member.icon}`} /></p>
                                                    {member.function}
                                                </h5>
                                                <div className="card-body">
                                                    <h5 className="card-title">{member.name}</h5>
                                                    <p className="card-text">Some extra text.</p>
                                                    {/* <a href="" className="btn btn-primary">Go somewhere</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}