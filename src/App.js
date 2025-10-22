import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import NavBar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Flights from "./pages/Flights";
import FlightSearch from "./components/FlightSearch";
import MyTrips from "./pages/MyTrips";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManageFlights from "./pages/ManageFlights";


function AppContent() {
  const location = useLocation();


  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/flights"
          element={
            <PrivateRoute>
              <Flights />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-trips"
          element={
            <PrivateRoute>
              <MyTrips />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <FlightSearch />
            </PrivateRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-flights"
          element={
            <PrivateRoute adminOnly={true}>
              <ManageFlights />
            </PrivateRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
