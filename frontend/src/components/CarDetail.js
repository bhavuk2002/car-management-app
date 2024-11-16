import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import axios from "axios"; // For making the API request
import { FaTrash } from "react-icons/fa6"; // React Icons
import { MdEdit } from "react-icons/md";
import baseURL from "../utils/config";

const CarDetail = ({ car, onDeleteSuccess }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const handleEditClick = () => {
    navigate(`/edit-car/${car._id}`); // Navigate to the edit page using car ID
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token"); // Get the auth token from localStorage

      // Make the API call to delete the car
      await axios.delete(`http://localhost:5000/car/${car._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Car deleted successfully!");

      // Trigger the success callback passed from parent component (if provided)
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error(
        "Error deleting car:",
        error.response?.data || error.message
      );
      alert("Failed to delete the car. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* Edit and Delete Icons */}
      <div className="absolute top-4 right-4 flex gap-4">
        {/* Edit Icon */}
        <button
          className="text-blue-600 hover:text-blue-800 focus:outline-none transition-all duration-300"
          title="Edit"
          onClick={handleEditClick}
        >
          <MdEdit size={24} /> {/* React Edit Icon */}
        </button>

        {/* Delete Icon */}
        <button
          className="text-red-600 hover:text-red-800 focus:outline-none transition-all duration-300"
          title="Delete"
          onClick={handleDelete} // Attach delete handler to the button
        >
          <FaTrash size={24} /> {/* React Delete Icon */}
        </button>
      </div>

      {/* Car Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{car.title}</h1>

      {/* Car Description */}
      <p className="text-lg text-gray-600 mb-6 max-w-3xl text-center">
        {car.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {car.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {car.images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={`${baseURL}/uploads/${image}`}
              alt={`Car ${index + 1}`}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetail;
