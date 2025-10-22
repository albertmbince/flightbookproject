import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function NavBar() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ✈️ AirBooker
            {user && (
              <span className="ms-2 text-muted" style={{ fontSize: "0.9rem" }}>
                Hello, {user.username}
              </span>
            )}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link className="nav-link" to="/">Home</Link>
              </Nav.Item>

              {user && user.is_staff ? (
                <>
                  <Nav.Item>
                    <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="nav-link" to="/manage-flights">Manage Flights</Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="nav-link" to="/flights">Flights</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="nav-link" to="/my-trips">My Trips</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="nav-link" to="/search">Flight Search</Link>
                  </Nav.Item>
                </>
              )}
            </Nav>

            <Nav>
              {user ? (
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Nav.Item>
                    <Link className="nav-link" to="/login">Login</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="nav-link" to="/register">Register</Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Spacer to prevent content from hiding behind sticky navbar */}
      <div style={{ height: "80px" }} />
    </>
  );
}

export default NavBar;
