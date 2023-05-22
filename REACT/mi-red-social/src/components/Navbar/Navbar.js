import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 992); // Establece el ancho límite en el que se considera que es necesario colapsar la barra de navegación
      setShowSearchBar(window.innerWidth <= 620); // Establece el ancho límite en el que se considera que es necesario mostrar la barra de búsqueda en el collapsable
    };

    // Agrega el event listener al montar el componente
    window.addEventListener('resize', handleResize);

    // Limpia el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className={`${isCollapsed ? 'navbar-collapse' : ''}`}>
      <Navbar.Brand href="./feed">
        <img className="logo mx-3" src="logo_horizontal.png" alt="" height="40" />
      </Navbar.Brand>
      {/* La barra de busqueda desaaparece en el menu cuando la ventana es inferior a 620 */}
      {!showSearchBar && (
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" aria-label="Search" />
          <Button variant="outline-primary" type="submit">Search</Button>
        </Form>
      )}
      <Navbar.Toggle className= "mx-3" aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className= "mx-3">
        <Nav className="ms-auto">
          <NavLink to="/" className="nav-link" aria-current="page"> </NavLink>
          <NavLink to="/feed" className="nav-link" aria-current="page"> Feed </NavLink>
          <NavLink to="/amigos" className="nav-link" aria-current="page"> Amigos </NavLink>
          <NavLink to="/perfil" className="nav-link" aria-current="page"> Mi Perfil </NavLink>
          <NavLink to="/" className="nav-link" aria-current="page" onClick={handleLogout}>Desconectarse </NavLink>
          
        </Nav>
        {/* La barra de busqueda aparece en el menu hamburguesa cuando la ventana es inferior a 620 */}
        <Form className={`d-flex d-lg-none ${showSearchBar ? '' : 'd-none'}`}> 
          <FormControl type="search" placeholder="Search" aria-label="Search" />
          <Button variant="outline-primary" type="submit">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
