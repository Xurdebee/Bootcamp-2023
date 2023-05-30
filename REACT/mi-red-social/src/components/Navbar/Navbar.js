import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1000);
      setShowSearchBar(window.innerWidth <= 630);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const adminValue = localStorage.getItem("is_admin");
    setIsAdmin(adminValue === "1");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      collapseOnSelect={isCollapsed}
    >
      <Navbar.Brand href="/feed">
        <img
          className="logo mx-3"
          src="/logo_horizontal.png"
          alt=""
          height="40"
        />
      </Navbar.Brand>
      {!showSearchBar && (
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" aria-label="Search" />
          <Button variant="outline-primary" type="submit">
            Search
          </Button>
        </Form>
      )}
      <Navbar.Toggle className="mx-3" aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="mx-3">
        <Nav className="ms-auto">
          <NavLink to="/feed" className="nav-link" aria-current="page">
            Feed
          </NavLink>
          <NavLink to="/amigos" className="nav-link" aria-current="page">
            Amigos
          </NavLink>
          <NavLink to="/perfil" className="nav-link" aria-current="page">
            Mi Perfil
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className="nav-link" aria-current="page">
              Admin
            </NavLink>
          )}
          <NavLink
            to="/"
            className="nav-link"
            aria-current="page"
            onClick={handleLogout}
          >
            Desconectarse
          </NavLink>
        </Nav>
        <Form className={`d-flex d-lg-none ${showSearchBar ? "" : "d-none"}`}>
          <FormControl type="search" placeholder="Search" aria-label="Search" />
          <Button variant="outline-primary" type="submit">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
