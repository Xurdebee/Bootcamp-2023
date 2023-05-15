import React from 'react';
import patatas from '../assets/img/patatas.jpg';

function NavBar() {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={patatas} alt="" height="40" /></a>
          <form className="d-flex" role="search">
            <input className="form-control ms d-none d-sm-block busqueda" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-primary d-none d-sm-block" type="submit">Search</button>
          </form>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="perfil_ejemplo-responsive.html">Mensajes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="feed-responsive.html">Feed</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="amigos-responsive.html">Amigos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="index-responsive.html">LogIn</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="mi_perfil-responsive.html">Mi Perfil</a>
              </li>
              <li>
                <form className="d-flex d-sm-none" role="search">
                  <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-primary" type="submit">Search</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  export default NavBar;
