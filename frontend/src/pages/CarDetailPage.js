import React from "react";
import CarDetail from "../components/CarDetail";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CarDetailPage = () => {
  const location = useLocation();
  const { car } = location.state;
  const navigate = useNavigate();

  const handleDeleteSuccess = () => {
    navigate("/dashboard");
  };

  return <CarDetail car={car} onDeleteSuccess={handleDeleteSuccess} />;
};

export default CarDetailPage;
