import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
          ✈️ AirBooker
          {user && (
            <span className="text-light ms-3 fw-normal" style={{ fontSize: "0.9rem" }}>
              Hello, {user.username}
            </span>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="mx-1">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/flights" className="mx-1">
              Flights
            </Nav.Link>
            <Nav.Link as={Link} to="/mytrips" className="mx-1">
              My Trips
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className="mx-1">
              Dashboard
            </Nav.Link>

            {user ? (
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }} className="mx-1">
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-1">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="mx-1">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
