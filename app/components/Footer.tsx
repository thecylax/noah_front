export function Footer() {

  return (
    <footer className="footer bg-dark text-center text-white">
      <div className="container p-4">
        <section className="mb-4">
          <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/igrejanoah.araucaria/" role="button">
            <i className="bi bi-facebook"></i>
          </a>

          <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/igrejanoah.araucaria/" role="button">
            <i className="bi bi-instagram"></i>
          </a>

        </section>

        <section className="mb-4">
          <p>Culto da família aos domingos às 10h e às 18h30</p>
          <p>Rua Rio Grande do Norte, 301 - Iguaçu / Araucária</p>
        </section>

        <div className="copyright text-center p-3">
          <a className="navbar-brand" href="#">
              <img src="/images/Logotipo_Noah_Branco.png" alt="noah" height="100"></img>
          </a>
        </div>
      </div>
    </footer>
  )
}