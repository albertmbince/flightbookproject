import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    try {

      const response = await api.post("auth/register/", formData);

      setSuccess(response.data.detail || "Registration successful! Redirecting...");



      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response?.data) {
        const messages = Object.values(err.response.data).flat().join(" ");
        setError(messages);
      } else {
        setError("Registration failed. Please check your inputs.");
      }
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h3 className="mb-3 text-center">Register</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Register
          </Button>
        </Form>

        <div className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Card>
    </div>
  );
}

export default Register;
