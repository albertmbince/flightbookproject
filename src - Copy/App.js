import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { TripsProvider } from "./context/TripsContext";
import { UserProvider } from "./context/UserContext";

import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import MyTrips from "./pages/MyTrips";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./components/AdminDashboard";

// Layout wrapper for pages that require Navbar
const WithNavbar = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

function App() {
  return (
    <UserProvider>
      <TripsProvider>
        <Router>
          <Routes>
            {/* Pages without Navbar */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Pages with Navbar */}
            <Route element={<WithNavbar />}>
              <Route path="/flights" element={<Flights />} />
              <Route path="/my-trips" element={<MyTrips />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </TripsProvider>
    </UserProvider>
  );
}

export default App;
