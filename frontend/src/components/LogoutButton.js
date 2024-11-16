import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear token and update state
    navigate("/logout"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="flex px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 font-semibold"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
