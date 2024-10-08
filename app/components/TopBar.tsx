export function TopBar() {

  return (
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/images/Icone_Noah_Branco.png" alt="noah" height="56"></img>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Início</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Louvor
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  {/* <a className="nav-link" href="/teams">Equipes</a> */}
                  <a className="nav-link" href="/musics">Músicas</a>
                  <a className="nav-link" href="/timetable/praise">Escala</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <div>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="50"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                </a>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Perfil</a></li>
                  <li><a className="dropdown-item" href="#">Configurações</a></li>
                  <li><a className="dropdown-item" href="#">Sair</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </nav>
  )
}