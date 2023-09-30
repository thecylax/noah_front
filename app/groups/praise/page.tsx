'use client'

import { useState } from "react"

export default function Page() {
    const musics = {
        "celebracao": [
                {"name": "Reina em mim", "author": "VINEYARD"},
                {"name": "Estamos de pé", "author": "Marcos Sales"},
                {"name": "Teu amor não falha", "author": "Nívea Soares"},
                {"name": "Reina o Senhor", "author": "Nívea Soares"},
                {"name": "Jesus em tua presença", "author": "Morada"},
                {"name": "O nosso general", "author": "Adhemar de Campos"},
                {"name": "Seu sangue", "author": "Fernandinho"},
                {"name": "Agindo Deus", "author": "Fernandinho"},
                {"name": "Filho de Deus vivo", "author": "Nívea Soares"},
                {"name": "Tributo a Yehowah", "author": "Adhemar de Campos"}
        ]
        ,
        "transicao": [
            {"name": "Vem me buscar", "author": "Jefferson & Suellen"},
            {"name": "Vem espírito de Deus", "author": "Bruna Olly"},
            {"name": "O céu sobre nós", "author": "Nova Igreja"},
            {"name": "MIlagres", "author": "Juliano Son"},
            {"name": "Ele cumprirá", "author": "Amém"},
            {"name": "Jeovah Jiré", "author": "Aline Barros"},
            {"name": "Me atraiu", "author": "Gabriela Rocha"},
            {"name": "Eu tenho você", "author": "Marcelo Markes"},
            {"name": "Cadeias quebrar", "author": "Soraya Moraes"},
            {"name": "Sobre as águas", "author": "Trazendo a arca"},
        ],
        "adoracao": [
            {"name": "Quem é aquele", "author":  "Drops"},
            {"name": "A Ele a Glória", "author":  "Gabriela Rocha"},
            {"name": "Jesus filho de Deus", "author":  "Fernandinho"},
            {"name": "Tú és bom", "author":  "Fred Arrais"},
            {"name": "Vitorioso és", "author":  "Gabriel Guedes"},
            {"name": "Cristo", "author":  "Tom Molinari"},
            {"name": "Tú és soberano", "author":  "Discopraise"},
            {"name": "Eu me rendo", "author":  "Renascer Praise"},
            {"name": "Te exaltamos", "author":  "Livres"},
            {"name": "Ao único", "author":  "Koynonia"},
        ],
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card space-up h-100">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Celebração
                                    <a href="#">
                                        <i className="bi bi-spotify text-success ps-1"></i>
                                    </a>
                                </h5>
                                <ul className="list-group list-group-flush">
                                    {musics.celebracao.map((music) => (
                                        <li className="list-group-item">
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
                        </div>
                    </div>
                    <div className="col">
                        <div className="card space-up h-100">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Transição
                                    <a href="#">
                                        <i className="bi bi-spotify text-success ps-1"></i>
                                    </a>
                                </h5>
                                <ul className="list-group list-group-flush">
                                    {musics.transicao.map((music) => (
                                        <li className="list-group-item">
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
                        </div>
                    </div>
                    <div className="col">
                        <div className="card space-up h-100">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Adoração
                                    <a href="#">
                                        <i className="bi bi-spotify text-success ps-1"></i>
                                    </a>
                                </h5>
                                <ul className="list-group list-group-flush">
                                    {musics.adoracao.map((music) => (
                                        <li className="list-group-item">
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
                                <a href="#">
                                    <i className="bi bi-plus-circle-fill"></i>
                                </a>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}