import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaSearch } from "react-icons/fa";

function FlightSearch({ onSearch }) {
  const [searchData, setSearchData] = useState({ from: "", to: "", date: "" });

  const handleChange = (e) => setSearchData({ ...searchData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const inputStyle = {
    paddingLeft: "35px",
  };

  const iconStyle = {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    color: "#6c757d",
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3 align-items-center">
        {[
          { name: "from", placeholder: "From", icon: <FaPlaneDeparture style={iconStyle} /> },
          { name: "to", placeholder: "To", icon: <FaPlaneArrival style={iconStyle} /> },
          { name: "date", placeholder: "Date", icon: <FaCalendarAlt style={iconStyle} />, type: "date" },
        ].map((field) => (
          <Col md={3} key={field.name} style={{ position: "relative" }}>
            {field.icon}
            <Form.Control
              type={field.type || "text"}
              placeholder={field.placeholder}
              name={field.name}
              value={searchData[field.name]}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </Col>
        ))}
        <Col md={3}>
          <Button type="submit" className="w-100" variant="primary">
            <FaSearch /> Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FlightSearch;
