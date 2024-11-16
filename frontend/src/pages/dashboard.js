import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import SearchBar from "../components/SearchBar";
import LogoutButton from "../components/LogoutButton";
import baseURL from "../utils/config";

const Dashboard = () => {
  const [cars, setCars] = useState([]); // Store the list of cars
  const [searchTerm, setSearchTerm] = useState(""); // For the search bar
  const [filteredCars, setFilteredCars] = useState([]); // Cars filtered by search term
  const navigate = useNavigate();

  // Fetch cars on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming authToken is stored here
        const response = await axios.get(`${baseURL}/cars`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass JWT token in headers
          },
        });
        const carsData = Array.isArray(response.data.cars)
          ? response.data.cars
          : [];
        setCars(carsData);
        setFilteredCars(carsData);
      } catch (error) {
        console.error(
          "Error fetching cars:",
          error.response?.data || error.message
        );
        setCars([]);
        setFilteredCars([]);
      }
    };

    fetchCars();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = cars.filter(
      (car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(car.tags) &&
          car.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
    setFilteredCars(filtered);
  }, [searchTerm, cars]);

  const handleCarClick = (car) => {
    // Navigate to the Car Details Page with car data
    navigate("/car-details", { state: { car } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button
            className="flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold"
            onClick={() => navigate("/add-car")}
          >
            Add New Car
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* Search bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Cars List in a Grid */}
      <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-3 lg:grid-cols-5">
        {Array.isArray(filteredCars) && filteredCars.length > 0 ? (
          filteredCars.map((car) => {
            return (
              <CarCard
                key={car._id}
                car={car}
                onClick={() => handleCarClick(car)}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-6">No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
