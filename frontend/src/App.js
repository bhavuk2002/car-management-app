import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../src/pages/login";
import Signup from "../src/pages/signUp";
import Logout from "../src/pages/logout";
import Dashboard from "../src/pages/dashboard";
import CarDetailPage from "./pages/CarDetailPage";
import CreateCarPage from "./pages/CreateCarPage";
import EditCar from "./pages/EditCarPage";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-car"
          element={
            <ProtectedRoute>
              <CreateCarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/car-details"
          element={
            <ProtectedRoute>
              {" "}
              <CarDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-car/:carId"
          element={
            <ProtectedRoute>
              {" "}
              <EditCar />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
