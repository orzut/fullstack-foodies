import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Search.css';

export const Search = () => {
  // const restaurants = useSelector((state) => state.restaurants.slice(0, 100));
  const restaurants = useSelector(state => state.restaurants)
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const searchBar = useRef(null);
  const clearIcon = useRef(null);
  const searchItems = (value) => {
    setSearch(value);
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    searchItems(search)
    // const asyncSearch = async () => {
    //   try {
    //     if (!search.trim()) {
    //       setSearchResult([])
    //       return
    //     }
    //     // Equivalent to `axios.get('/api/products?key={searchKey}&limit=5')`
    //     // const res = await axios.get('/api/restaurants',{params: {key: search, limit: 5}})
    //     // setSearchResult(res.data)
    //     const searchRestaurants = restaurants.filter(restaurant => restaurant.name.trim()
    //         .toLowerCase().includes(search.trim().toLowerCase()))
    //     setSearchResult(searchRestaurants)
    //   } catch (ex) {
    //     console.log(ex)
    //   }
    // }
    // asyncSearch();
  }, [search])

  const keyUpHandler = (ev) => {
    if(search && clearIcon.current.style.visibility != "visible"){
      clearIcon.current.style.visibility = "visible";
    } else if(!search) {
      clearIcon.current.style.visibility = "hidden";
    }
  };

  const clearIconHandler = () => {
    setSearch('');
    setSearchResult([]);
    clearIcon.current.style.visibility='hidden';
  }

  const handleChange = (ev) => {
    setSearch(ev.target.value)
  }

  const handleClick = (ev) => {
    setIsActive(!isActive)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    // navigate(`/search/?key=${search}`);
    searchItems(filteredData)
    handleClearSearch();
  }

  const handleClearSearch = () => {
    setSearch('');
    setSearchResult([]);
  }

  return (
    <div className="flex items-end">
      {/*<div className="flex border border-purple-200 rounded">*/}
      {/*  <form onSubmit={handleSubmit} className="flex border border-purple-200 rounded">*/}
      <form onSubmit={handleSubmit} className='search-bar'>
        <img className="search-icon"
             src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
        />
        <input
          type="text"
          style={{border: 'none'}}
          // className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          onKeyUp={keyUpHandler}
          value={search}
          onClick={handleClick}
          onChange={handleChange}
        />
        <img ref={clearIcon}
             className="clear-icon" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwICAgQzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43NzggICBjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4ICAgYzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4ICAgbC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
             style={{visibility:'hidden'}}
             onClick={clearIconHandler}
        />
        {/*<button className="px-4 text-white bg-purple-600 border-l rounded " type='submit'>*/}
        {/*  {" "}*/}
        {/*  <Link to={{ pathname: "/search", state: { filteredData } }}>*/}
        {/*    Search*/}
        {/*  </Link>*/}
        {/*</button>*/}
        <nav className='search-result'>
          {(filteredData.length>0) && (
            <ul>
              {
                filteredData.slice(0,5).map(data => {
                  return (
                      <li>{data.name}</li>
                  )
                })
              }
              <Link to={{ pathname: "/search", state: { filteredData } }}>See All...</Link>
            </ul>
          )}
        </nav>
      </form>
      {/*</div>*/}
    </div>
  );
};
