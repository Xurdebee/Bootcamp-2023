import React, { useState, useEffect } from 'react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="logo" src="logo1.png" alt="" height="40" /></a>
        <form className="d-flex" role="search">
          <input className="form-control ms d-none d-sm-block busqueda" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-primary d-none d-sm-block" type="submit">Search</button>
        </form>
        <button className="navbar-toggler d-lg-none" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {isOpen && (
          <div className="navbar-collapse">
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
        )}
      </div>
    </nav>
  );
}

export default NavBar;
