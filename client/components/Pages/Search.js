import React from "react";
import { connect } from "react-redux";

const Search = () => {
  return (
    <div className="flex items-end">
      <div className="flex border border-purple-200 rounded">
        <input
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

const mapState = (state) => {
  console.log(state);
  return {
    state,
  };
};

export default connect(mapState)(Search);
