import React, { useState } from "react";
import { useSelector } from "react-redux";
import Restaurants from "./Restaurants";

export const Search = () => {
  const restaurants = useSelector((state) => state.restaurants.slice(0, 100));
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  console.log(restaurants);
  const searchItems = (value) => {
    setSearch(value);
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <div className="flex items-end">
      <div className="flex border border-purple-200 rounded">
        <input
          onChange={(ev) => searchItems(ev.target.value)}
          type="text"
          className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
        />
        <button className="px-4 text-white bg-purple-600 border-l rounded ">
          Search
        </button>
      </div>
    </div>
  );
};
