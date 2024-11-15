import Image from "next/image";
import Link from "next/link";

export function TopBar() {

  return (
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/" passHref>
            <Image src="/images/Icone_Noah_Branco.png" alt="noah" height={56} width={500} style={{ width: 'auto' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="navbar-brand" href="/" aria-current="page" passHref>
                Início
              </Link>
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
                  <Image
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height={50}
                    width={500}
                    style={{ width: 'auto' }}
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