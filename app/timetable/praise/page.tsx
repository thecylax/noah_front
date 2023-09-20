export default function Page() {
    return (
        <>
            {/* <table className="table table-hover table-striped-columns">
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
            </table> */}
            <div className="input-group">
                <div className="form-outline">
                    <input type="search" id="form1" className="form-control" />
                    <label className="form-label" htmlFor="form1">Search</label>
                </div>
                <button type="button" className="btn btn-primary">
                    <i className="bi bi-search"></i>
                </button>
            </div>

            <div className="container-fluid">
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
                                    <div className="col">
                                        <div className="card space-up">
                                            <div className="card-header">Ministro</div>
                                            <div className="card-body">
                                                <h5 className="card-title">Eliel</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="card space-up">
                                            <div className="card-header">Backing Vocal</div>
                                            <div className="card-body">
                                                <h5 className="card-title">Iasmini</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="card space-up">
                                            <div className="card-header">Backing Vocal</div>
                                            <div className="card-body">
                                                <h5 className="card-title">Anna C.</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="card space-up">
                                            <div className="card-header">Guitarra</div>
                                            <div className="card-body">
                                                <h5 className="card-title">-</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="card space-up">
                                            <div className="card-header">Teclado</div>
                                            <div className="card-body">
                                                <h5 className="card-title">Uanderson</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="card space-up">
                                            <div className="card-header">Baixo</div>
                                            <div className="card-body">
                                                <h5 className="card-title">Gegê</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="card space-up">
                                            <div className="card-header">Bateria</div>
                                            <div className="card-body">
                                                <h5 className="card-title">Gabriel</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="card space-up">
                                            <div className="card-header">Sonoplasta</div>
                                            <div className="card-body">
                                                <h5 className="card-title">Samuel</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>
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
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
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
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}