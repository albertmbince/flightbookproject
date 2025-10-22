import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/custom.css";

import axios from "axios";
import { UserProvider } from "./context/UserContext";
import { TripsProvider } from "./context/TripsContext";


axios.defaults.baseURL = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("access_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TripsProvider>
        <App />
      </TripsProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
