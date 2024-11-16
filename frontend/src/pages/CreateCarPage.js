import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !images.length) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      setLoading(true);

      const tagsArray = tags.split(",").map((tag) => tag.trim()); // Convert to array and trim spaces
      // Create form data to send files
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      Array.from(images).forEach((image) => formData.append("images", image));

      tagsArray.forEach((tag) => formData.append("tags[]", tag)); // Send as array

      const token = localStorage.getItem("token"); // Auth token
      await axios.post("http://localhost:5000/car/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Car created successfully!");
      setLoading(false);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error(
        "Error creating car:",
        error.response?.data || error.message
      );
      alert("Failed to create car. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-medium mb-8">Create a New Car</h1>
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
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm text-gray-700 font-medium"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
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
            Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="images"
            onChange={(e) => setImages(e.target.files)}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            multiple
            accept="image/*"
            required
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
          {loading ? "Submitting..." : "Create Car"}
        </button>
      </form>
    </div>
  );
};

export default CreateCar;
