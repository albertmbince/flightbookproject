// src/components/FlightSearch.js
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import api from "../api/axiosConfig";

function FlightSearch() {
  const [searchData, setSearchData] = useState({ from: "", to: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setSearchData({ ...searchData, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.get(
        `search/?origin=${searchData.from}&destination=${searchData.to}`
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch flights");
    }
    setLoading(false);
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSearch}>
        <Row className="g-3">
          <Col md={4}>
            <Form.Control
              name="from"
              placeholder="From"
              value={searchData.from}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={4}>
            <Form.Control
              name="to"
              placeholder="To"
              value={searchData.to}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={4}>
            <Button type="submit" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="mt-4">
        {loading && (
          <div className="text-center mt-3">
            <Spinner animation="border" />
            <p>Searching flights...</p>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {!loading && results.length === 0 && <p className="mt-3">No flights found.</p>}

        <Row className="g-4 mt-2">
          {results.map((flight) => (
            <Col md={6} lg={4} key={flight.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{flight.flight_number}</Card.Title>
                  <Card.Text>
                    <strong>From:</strong> {flight.origin} <br />
                    <strong>To:</strong> {flight.destination} <br />
                    <strong>Departure:</strong> {new Date(flight.departure_time).toLocaleString()} <br />
                    <strong>Arrival:</strong> {new Date(flight.arrival_time).toLocaleString()} <br />
                    <strong>Price:</strong> ₹{flight.price} <br />
                    <strong>Status:</strong>{" "}
                    <span style={{ color: flight.status === "On-time" ? "green" : "red", fontWeight: "bold" }}>
                      {flight.status}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default FlightSearch;
