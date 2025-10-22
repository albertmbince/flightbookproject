import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import api from "../api/axiosConfig";

function Dashboard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await api.get("/api/flights/");
        setFlights(res.data);
      } catch (err) {
        setError("Failed to load flights.");
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center text-primary">Dashboard</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : flights.length === 0 ? (
        <Alert variant="info" className="text-center">No flights available.</Alert>
      ) : (
        <Row className="g-4">
          {flights.map(flight => (
            <Col md={6} lg={4} key={flight.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">{flight.flight_number}</Card.Title>
                  <Card.Text>
                    From: {flight.origin} <br />
                    To: {flight.destination} <br />
                    Departure: {new Date(flight.departure_time).toLocaleString()} <br />
                    Arrival: {new Date(flight.arrival_time).toLocaleString()} <br />
                    Price: ₹{flight.price} <br />
                    Status: <span style={{ color: flight.status==="On-time"?"green":"red", fontWeight:"bold"}}>{flight.status}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
