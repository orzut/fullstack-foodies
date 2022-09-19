import React from "react";
import { useLocation } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

export const SearchData = () => {
  const location = useLocation();
  const searchData = location.state.filteredData;
  return (
    <div>
      {searchData.length ? (
        <div>
          <h2 className="ml-20 mt-10">Search Results ({searchData.length})</h2>
          <div className="flex flex-wrap justify-around">
            {searchData.map((restaurant) => {
              return (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              );
            })}
          </div>
        </div>
      ) : (
        <h2 className="ml-20 mt-10">No Results Found</h2>
      )}
    </div>
  );
};
