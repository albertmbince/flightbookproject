import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert, Card, Row, Col } from "react-bootstrap";

function Flights() {
  const [flights, setFlights] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get("/api/flights/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlights(res.data);
    } catch (err) {
      console.log(err.response || err);
    }
  };

  const handleBook = async (flightId) => {
    try {
      const res = await axios.post(
        "/api/bookings/create/",
        { flight: flightId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlert({ type: "success", message: "Flight booked successfully!" });
    } catch (err) {
      setAlert({
        type: "danger",
        message:
          err.response?.data?.error ||
          "Error booking flight. Maybe already booked.",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Flights</h2>
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}

      <Row>
        {flights.map((f) => (
          <Col md={4} key={f.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>
                  {f.origin} → {f.destination}
                </Card.Title>
                <Card.Text>
                  Departure: {f.departure} <br />
                  Arrival: {f.arrival} <br />
                  Price: ${f.price}
                </Card.Text>
                <Button onClick={() => handleBook(f.id)} variant="primary">
                  Book
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Flights;
