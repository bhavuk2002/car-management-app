import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // To get the carId from the URL

const EditCar = () => {
  const [car, setCar] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { carId } = useParams(); // Get the carId from the URL
  const navigate = useNavigate();

  // Fetch car details when the component is mounted
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/car/${carId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const carData = response.data.car;
        setCar(carData);
        setTitle(carData.title);
        setDescription(carData.description);
        setTags(carData.tags.join(", "));
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCarDetails();
  }, [carId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (tags) {
        const tagsArray = tags.split(",").map((tag) => tag.trim());
        tagsArray.forEach((tag) => formData.append("tags[]", tag));
      }
      Array.from(images).forEach((image) => formData.append("images", image));

      const token = localStorage.getItem("token"); // Get the auth token from localStorage
      console.log(title, description, tags, images);
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // Log each key and value in FormData
      }
      await axios.patch(`http://localhost:5000/car/${carId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Car updated successfully!");
      setLoading(false);
      navigate("/dashboard"); // Redirect to dashboard after updating
    } catch (error) {
      console.error(
        "Error updating car:",
        error.response?.data || error.message
      );
      alert("Failed to update car. Please try again.");
      setLoading(false);
    }
  };

  if (!car) {
    return <p>Loading car details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Edit Car</h1>
      <form
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm text-gray-700 font-medium"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter car title"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter car description"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm text-gray-700 font-medium"
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., sedan, luxury, sports"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm text-gray-700 font-medium"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            onChange={(e) => setImages(e.target.files)}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            multiple
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 text-white font-medium rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition-all duration-300`}
        >
          {loading ? "Updating..." : "Update Car"}
        </button>
      </form>
    </div>
  );
};

export default EditCar;
