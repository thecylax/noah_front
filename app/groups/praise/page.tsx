'use client'

import { useState } from "react"

export default function Page() {
    const musics = {
        "celebracao": [
            {"id": 1, "name": "Reina em mim", "author": "VINEYARD"},
            {"id": 2, "name": "Estamos de pé", "author": "Marcos Sales"},
            {"id": 3, "name": "Teu amor não falha", "author": "Nívea Soares"},
            {"id": 4, "name": "Reina o Senhor", "author": "Nívea Soares"},
            {"id": 5, "name": "Jesus em tua presença", "author": "Morada"},
            {"id": 6, "name": "O nosso general", "author": "Adhemar de Campos"},
            {"id": 7, "name": "Seu sangue", "author": "Fernandinho"},
            {"id": 8, "name": "Agindo Deus", "author": "Fernandinho"},
            {"id": 9, "name": "Filho de Deus vivo", "author": "Nívea Soares"},
            {"id": 10, "name": "Tributo a Yehowah", "author": "Adhemar de Campos"}
        ]
        ,
        "transicao": [
            {"id": 1, "name": "Vem me buscar", "author": "Jefferson & Suellen"},
            {"id": 2, "name": "Vem espírito de Deus", "author": "Bruna Olly"},
            {"id": 3, "name": "O céu sobre nós", "author": "Nova Igreja"},
            {"id": 4, "name": "MIlagres", "author": "Juliano Son"},
            {"id": 5, "name": "Ele cumprirá", "author": "Amém"},
            {"id": 6, "name": "Jeovah Jiré", "author": "Aline Barros"},
            {"id": 7, "name": "Me atraiu", "author": "Gabriela Rocha"},
            {"id": 8, "name": "Eu tenho você", "author": "Marcelo Markes"},
            {"id": 9, "name": "Cadeias quebrar", "author": "Soraya Moraes"},
            {"id": 10, "name": "Sobre as águas", "author": "Trazendo a arca"},
        ],
        "adoracao": [
            {"id": 1, "name": "Quem é aquele", "author":  "Drops"},
            {"id": 2, "name": "A Ele a Glória", "author":  "Gabriela Rocha"},
            {"id": 3, "name": "Jesus filho de Deus", "author":  "Fernandinho"},
            {"id": 4, "name": "Tú és bom", "author":  "Fred Arrais"},
            {"id": 5, "name": "Vitorioso és", "author":  "Gabriel Guedes"},
            {"id": 6, "name": "Cristo", "author":  "Tom Molinari"},
            {"id": 7, "name": "Tú és soberano", "author":  "Discopraise"},
            {"id": 8, "name": "Eu me rendo", "author":  "Renascer Praise"},
            {"id": 9, "name": "Te exaltamos", "author":  "Livres"},
            {"id": 10, "name": "Ao único", "author":  "Koynonia"},
        ],
    }

    return (
        <>
            <div className="container-fluid">
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Cadastrar música</button>
                <div className="row">
                    <div className="col-md">
                        <div className="card mt-2">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Celebração
                                    <a href="#">
                                        <i className="bi bi-spotify text-success ps-1"></i>
                                    </a>
                                </h5>
                                <ul className="list-group list-group-flush">
                                    {musics.celebracao.map((music) => (
                                        <li className="list-group-item" key={music.id}>
                                            <div className="row">
                                                <div className="col">
                                                    <p className="fw-medium">{music.name}</p>
                                                </div>
                                                <div className="col">
                                                    <p className="fst-italic">{music.author}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#addModal">
                                    <i className="bi bi-plus-circle-fill fs-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card mt-2">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Transição
                                    <a href="#">
                                        <i className="bi bi-spotify text-success ps-1"></i>
                                    </a>
                                </h5>
                                <ul className="list-group list-group-flush">
                                    {musics.transicao.map((music) => (
                                        <li className="list-group-item" key={music.id}>
                                            <div className="row">
                                                <div className="col">
                                                    <p className="fw-medium">{music.name}</p>
                                                </div>
                                                <div className="col">
                                                    <p className="fst-italic">{music.author}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#addModal">
                                    <i className="bi bi-plus-circle-fill fs-1"></i>
                                </a>
                            </div>                            
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card mt-2">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Adoração
                                    <a href="#">
                                        <i className="bi bi-spotify text-success ps-1"></i>
                                    </a>
                                </h5>
                                <ul className="list-group list-group-flush">
                                    {musics.adoracao.map((music) => (
                                        <li className="list-group-item" key={music.id}>
                                            <div className="row">
                                                <div className="col">
                                                    <p className="fw-medium">{music.name}</p>
                                                </div>
                                                <div className="col">
                                                    <p className="fst-italic">{music.author}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#addModal">
                                    <i className="bi bi-plus-circle-fill fs-1"></i>
                                </a>
                            </div>                            
                        </div>
                    </div>
                </div>

                {/* modal cadastro musica*/}
                <div className="modal fade" id="createModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Cadastrar música</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">@</span>
                                        <input type="text" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon2"><i className="bi bi-person-vcard"></i></span>
                                        <input type="text" className="form-control" placeholder="Autor" aria-label="Autor" aria-describedby="basic-addon2" />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon3"><i className="bi bi-spotify"></i></span>
                                        <input type="text" className="form-control" placeholder="Link Spotify" aria-label="Spotify" aria-describedby="basic-addon3" />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon4"><i className="bi bi-youtube"></i></span>
                                        <input type="text" className="form-control" placeholder="Link Youtube" aria-label="Youtube" aria-describedby="basic-addon4" />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon5"><i className="bi bi-music-note-beamed"></i></span>
                                        <input type="text" className="form-control" placeholder="Link Cifra" aria-label="Cifra" aria-describedby="basic-addon5" />
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

                {/* modal adicionar musica*/}
                <div className="modal fade" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Incluir música</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group list-group-flush">
                                    {musics.celebracao.map((music) => (
                                        <li className="list-group-item" key={music.id}>
                                            <input type="checkbox" className="form-check-input me-1" value={""} id={`checkBox${music.id}`} />
                                            <label htmlFor={`checkBox${music.id}`} className="form-check-label"><strong>{music.name}</strong> - <i>{music.author}</i></label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button type="button" className="btn btn-primary">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}