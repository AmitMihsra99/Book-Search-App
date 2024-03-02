// components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onSearch, onFilter }) => {
  const [filterType, setFilterType] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handlePublicationDateChange = (e) => {
    setPublicationDate(e.target.value);
  };

  const handleFilterButtonClick = () => {
    onFilter({ filterType, publicationDate });
  };

  return (
    <header className="bg-yellow-800 p-1">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search books..."
              className="py-2 px-4 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="text-white w-full md:w-auto">
              <select
                className="py-2 px-4 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full md:w-50"
                onChange={handleFilterChange}
              >
                <option value="">Category</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
              </select>
            </div>

            <div className="text-white w-full md:w-auto">
              <label className="mr-2">Publication-Date</label>
              <input
                type="date"
                className="py-2 px-4 text-white bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full md:w-50"
                onChange={handlePublicationDateChange}
              />
            </div>
          </div>

          <button
            className="text-white bg-blue-500 px-4 py-2 rounded-md w-50 md:w-auto"
            onClick={handleFilterButtonClick}
          >
            Apply Filter
          </button>
        </div>
        <Link to="/fav" className="text-white px-4 py-2 bg-yellow-500 rounded-md w-50 md:w-auto mt-4 md:mt-0">
          Favorites
        </Link>
      </div>
    </header>
  );
};

export default Header;
