import React from "react";
import "../styles/custom.css";

function About() {
  return (
    <div className="about-page text-light py-5">
      <div className="container text-center mt-5 pt-5">
        <h1 className="text-info fw-bold mb-4">About AirBooker</h1>
        <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
          AirBooker is your one-stop platform for effortless flight booking.
          We simplify air travel by offering a seamless, transparent, and fast booking experience.
        </p>
        <p className="text-muted mt-3" style={{ maxWidth: "700px", margin: "auto" }}>
          Whether you're a frequent traveler or planning your dream vacation, AirBooker ensures
          affordable and secure flights with an easy-to-use interface.
        </p>
      </div>
    </div>

  );
}

export default About;
