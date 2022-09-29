import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Pagination from "../Pagination";

export const SearchData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(100);
  const location = useLocation();
  const searchData = location.state.filteredData;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const displaySearchData = searchData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(searchData.length / recordsPerPage);

  return (
    <div>
      {searchData.length ? (
        <div>
          <h2 className="ml-20 mt-10">Search Results ({searchData.length})</h2>
          <div className="flex flex-wrap justify-around">
            {displaySearchData.map((restaurant) => {
              return (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              );
            })}
          </div>
          <div className="pagination-container">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      ) : (
        <h2 className="ml-20 mt-10">No Results Found</h2>
      )}
    </div>
  );
};
