import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Auth.css";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("auth/login/", {
        username: credentials.username,
        password: credentials.password,
      });

      const user = response.data.user;


      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);


      loginUser(user);


      if (user.is_superuser || user.role === "admin" || user.is_staff) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err.response?.data);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data) {
        const messages = Object.values(err.response.data).flat().join(" ");
        setError(messages);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h3 className="mb-3 text-center">Login</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-2">
            Login
          </Button>
        </Form>

        <Button
          variant="secondary"
          className="w-100 mb-2"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>

        <p className="mt-2 text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
