import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Card } from "react-bootstrap";
import axios from "axios";

function ManageFlights() {
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    destination: "",
    departure: "",
    arrival: "",
    price: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get("/flights/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlights(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/flights/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ show: true, message: "Flight added successfully!", variant: "success" });
      setShowModal(false);
      setFormData({ name: "", origin: "", destination: "", departure: "", arrival: "", price: "" });
      fetchFlights();
    } catch (err) {
      console.log(err);
      setAlert({ show: true, message: "Error saving flight. Make sure you are an admin.", variant: "danger" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Flights</h2>

      {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>{alert.message}</Alert>}

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Flight
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Flight Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Origin</Form.Label>
              <Form.Control type="text" name="origin" value={formData.origin} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Destination</Form.Label>
              <Form.Control type="text" name="destination" value={formData.destination} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Departure</Form.Label>
              <Form.Control type="datetime-local" name="departure" value={formData.departure} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Arrival</Form.Label>
              <Form.Control type="datetime-local" name="arrival" value={formData.arrival} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-2">Add Flight</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h3 className="mt-4">Existing Flights</h3>
      <div className="row">
        {flights.map((f) => (
          <div className="col-md-4 mb-3" key={f.id}>
            <Card>
              <Card.Body>
                <Card.Title>{f.name}</Card.Title>
                <Card.Text>
                  {f.origin} → {f.destination}<br />
                  Departure: {new Date(f.departure).toLocaleString()}<br />
                  Arrival: {new Date(f.arrival).toLocaleString()}<br />
                  Price: ${f.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageFlights;
