import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex justify-center items-center mb-4">
      <div
        className={`flex items-center w-full max-w-lg px-4 py-2 border rounded-full shadow-sm bg-white 
          ${
            isFocused
              ? "border-gray-300 shadow-lg"
              : "border-gray-200 shadow-md"
          } transition-all duration-300`}
      >
        <FiSearch
          className={`text-xl ${isFocused ? "text-gray-800" : "text-gray-400"}`}
        />
        <input
          type="text"
          placeholder="Search Cars"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-2 py-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none focus:border-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            border: "none", // Completely removes the inner border
            boxShadow: "none", // Removes default box-shadow
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
