import React from "react";
import { Navbar, Nav, Container, Row, Col, NavDropdown } from "react-bootstrap";
import "./navbar.scss";
import { Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { UserProfile } from "../profile-view/profile-view";

export function NavBarView(props) {
  const user = localStorage.getItem("user");

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Navbar className="navbar-custom " expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand>myFlix</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="navbar-text" href="/">
              Movies
            </Nav.Link>
            <Nav.Link className="navbar-text" href="/user">
              Profile
            </Nav.Link>
            <Link to="/">
              <Nav.Link className="navbar-text" onClick={handleLogOut}>
                Logout
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
