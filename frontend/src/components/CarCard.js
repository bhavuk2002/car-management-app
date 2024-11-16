import React from "react";
import baseURL from "../utils/config";

const CarCard = ({ car, onClick }) => {
  return (
    <div
      key={car._id}
      className="relative max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full h-64 overflow-hidden relative">
        {/* Car Image */}
        <img
          className="rounded-t-lg w-full h-full object-cover transition-transform duration-300 ease-in-out transform"
          src={`${baseURL}/uploads/${car.images[0]}`}
          alt={car.title}
        />
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {car.title}
        </h5>
        <p className="mb-3 text-base font-normal text-gray-700 dark:text-gray-400">
          {car.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(car.tags) &&
            car.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
