export default function Page() {
    return (
        <>
            <table className="table table-hover table-striped-columns">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col"><i className="bi bi-people-fill"></i>Ministro</th>
                    <th scope="col"><i className="bi bi-mic-fill"></i>Back vocal</th>
                    <th scope="col"><i className="bi bi-mic-fill"></i>Back vocal</th>
                    <th scope="col"><i className="bi bi-guitar"></i>Guitarra</th>
                    <th scope="col"><i className="bi bi-guitar"></i>Teclado</th>
                    <th scope="col"><i className="bi bi-guitar"></i>Baixo</th>
                    <th scope="col"><i className="bi bi-guitar"></i>Bateria</th>
                    <th scope="col"><i className="bi bi-guitar"></i>Sonoplasta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

            <div className="container text-center">
                <div className="row">
                    <div className="col-xl-1 col-md-4">
                        Ministro
                    </div>
                    <div className="col-xl-1 col-md-4">
                        Backing Vocal
                    </div>
                    <div className="col-xl-1 col-md-4">
                        Backing Vocal
                    </div>
                    <div className="col-xl-1 col-md-4">
                        Guitarra
                    </div>
                    <div className="col-xl-1 col-md-4">
                        Teclado
                    </div>
                    <div className="col-xl-1 col-md-4">
                        Baixo
                    </div>
                    <div className="col-xl-1 col-md-4">
                        Bateria
                    </div>
                    <div className="col-xl-1 col-md-4">
                        Sonoplasta
                    </div>
                </div>

                <div className="row">
                    <div className="col col-md-4">
                        Column2
                    </div>
                    <div className="col col-md-4">
                        Column2
                    </div>
                    <div className="col col-md-4">
                        Column2
                    </div>
                    <div className="col col-md-4">
                        Column2
                    </div>
                    <div className="col col-md-4">
                        Column2
                    </div>
                    <div className="col col-md-4">
                        Column2
                    </div>
                    <div className="col col-md-4">
                        Column2
                    </div>
                    <div className="col col-md-4">
                        Column2
                    </div>
                </div>

            </div>
        </>
    )
}