import React, { useState } from "react";
import "../styles/custom.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We’ll get back to you soon.");
  };

  return (
    <div className="contact-page text-light py-5">
      <div className="container mt-5 pt-5">
        <h1 className="text-info fw-bold text-center mb-4">Contact Us</h1>
        <p className="text-center mb-5">We’d love to hear from you! Send us a message below.</p>

        <form onSubmit={handleSubmit} className="glass-card p-4 mx-auto" style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Type your message here"
            ></textarea>
          </div>
          <div className="text-center">
            <button className="btn btn-info px-4 fw-semibold" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Contact;
