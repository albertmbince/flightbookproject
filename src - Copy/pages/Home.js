import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/custom.css"; // existing CSS file

function Home() {
  const navigate = useNavigate();

  const handleSearchFlights = () => {
    const isAuthenticated = !!localStorage.getItem("access_token");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/flights");
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
           ✈ AirBooker
        </div>
        <ul className="navbar-links">
          <li><a href="/about" className="nav-link">About Us</a></li>
          <li><a href="/contact" className="nav-link">Contact</a></li>
          <li><a href="/login" className="nav-link">Login</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to AirBooker</h1>
          <p>Book your flights easily and quickly</p>
          <button className="btn-search" onClick={handleSearchFlights}>
            Search Flights
          </button>
        </div>
      </header>
    </div>

  );
}

export default Home;
