import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 992); // Establece el ancho límite en el que se considera que es necesario colapsar la barra de navegación
      setShowSearchBar(window.innerWidth <= 575); // Establece el ancho límite en el que se considera que es necesario mostrar la barra de búsqueda en el collapsable
    };

    // Agrega el event listener al montar el componente
    window.addEventListener('resize', handleResize);

    // Limpia el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Navbar bg="light" expand="lg" sticky="top" className={`${isCollapsed ? 'navbar-collapse' : ''}`}>
      <Navbar.Brand href="#">
        <img className="logo" src="logo_horizontal.png" alt="" height="40" />
      </Navbar.Brand>
      {/* La barra de busqueda desaaparece en el menu cuando la ventana es inferior a 575 */}
      {!showSearchBar && (
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" aria-label="Search" />
          <Button variant="outline-primary" type="submit">Search</Button>
        </Form>
      )}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="perfil_ejemplo-responsive.html">Mensajes</Nav.Link>
          <Nav.Link href="feed-responsive.html">Feed</Nav.Link>
          <Nav.Link href="amigos-responsive.html">Amigos</Nav.Link>
          <Nav.Link href="index-responsive.html">LogIn</Nav.Link>
          <Nav.Link href="mi_perfil-responsive.html">Mi Perfil</Nav.Link>
        </Nav>
        {/* La barra de busqueda aparece en el menu hamburguesa cuando la ventana es inferior a 575 */}
        <Form className={`d-flex d-lg-none ${showSearchBar ? '' : 'd-none'}`}> 
          <FormControl type="search" placeholder="Search" aria-label="Search" />
          <Button variant="outline-primary" type="submit">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
