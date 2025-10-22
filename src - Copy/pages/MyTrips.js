import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { TripsContext } from "../context/TripsContext";

function MyTrips() {
  const { trips, removeTrip } = useContext(TripsContext);

  const handleCancelTrip = (id) => {
    if (window.confirm("Are you sure you want to cancel this trip?")) {
      removeTrip(id);
      alert("Trip cancelled successfully!");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-primary">My Trips</h2>
      {trips.length === 0 ? (
        <p className="text-center">You have no trips booked.</p>
      ) : (
        <Row className="g-4">
          {trips.map((trip) => (
            <Col md={6} lg={4} key={trip.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{trip.flightNumber}</Card.Title>
                  <Card.Text>
                    From: {trip.from} <br />
                    To: {trip.to} <br />
                    Price: ₹{trip.price}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleCancelTrip(trip.id)}
                  >
                    Cancel Trip
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default MyTrips;
