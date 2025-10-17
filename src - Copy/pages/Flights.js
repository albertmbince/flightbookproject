import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import api from "../api/axiosConfig";
import { TripsContext } from "../context/TripsContext";

function Flights() {
  const { addTrip } = useContext(TripsContext);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch flights from backend
  const fetchFlights = async () => {
    try {
      const res = await api.get("flights/");
      setFlights(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load flights.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> <p>Loading flights...</p>
      </div>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-primary">Available Flights</h2>
      <Row className="g-4">
        {flights.map((flight) => (
          <Col md={6} lg={4} key={flight.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{flight.flight_number}</Card.Title>
                <Card.Text>
                  From: {flight.origin} <br />
                  To: {flight.destination} <br />
                  Departure: {new Date(flight.departure_time).toLocaleString()} <br />
                  Arrival: {new Date(flight.arrival_time).toLocaleString()} <br />
                  Price: ₹{flight.price} <br />
                  Status: {flight.status}
                </Card.Text>
                <Button variant="success" onClick={() => addTrip(flight)}>
                  Book Flight
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Flights;
