import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Autocomplete, useLoadScript} from '@react-google-maps/api';
import {getGeocode, getLatLng} from "use-places-autocomplete";
import {FaMapMarkerAlt} from 'react-icons/fa';
import './UserLocation.css';
import {getUserLocation, setUserLocation} from "../../store";

function UserLocation() {
    const clearIcon = useRef(null);
    const userLocationBar = useRef(null);
    const location = useSelector(state => state.location);
    const dispatch = useDispatch();
    const [userInputLocation, setUserInputLocation] = useState('');
    // const [userCoord, setUserCoord] = useState({lat:0, lng:0});
    const librariesRef = useRef(['places'])

    useEffect(() => {
        dispatch(getUserLocation())
    },[])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAGo2NE7sdqcMdbrfboJ1AnbWiAljSl_lI',
        libraries: librariesRef.current
    });

    const keyUpHandler = (ev) => {
        if(userInputLocation && clearIcon.current.style.visibility != "visible"){
            clearIcon.current.style.visibility = "visible";
        } else if(!userInputLocation) {
            clearIcon.current.style.visibility = "hidden";
        }
    };

    const clearIconHandler = () => {
        setUserInputLocation('');
        clearIcon.current.style.visibility='hidden';
        dispatch(getUserLocation());
    }

    const handleChange = (ev) => {
        setUserInputLocation(ev.target.value)
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setUserInputLocation(userLocationBar.current.value)
        const results = await getGeocode({ address: userLocationBar.current.value })
        const latLng = getLatLng(results[0]);
        // setUserCoord(latLng)
        dispatch(setUserLocation(latLng));
    }

    if (!isLoaded) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return (
            <form onSubmit={handleSubmit} className='user-location-container'>
                <div className='location-input-icon-container' onClick={handleSubmit}>
                    <FaMapMarkerAlt className='location-input-icon'/>
                </div>
                <Autocomplete>
                    <input
                        type='text'
                        name='locationInput'
                        placeholder="Enter your address..."
                        onKeyUp={keyUpHandler}
                        value={userInputLocation}
                        onChange={handleChange}
                        ref={userLocationBar}
                    />
                </Autocomplete>
                <input style={{visibility: 'hidden', position: 'absolute'}} type='submit'/>
                <div>
                    <img ref={clearIcon}
                         className="clear-icon"
                         src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwICAgQzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43NzggICBjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4ICAgYzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4ICAgbC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
                         style={{visibility: 'hidden'}}
                         onClick={clearIconHandler}
                    />
                </div>
            </form>
        )
    }
};
export default UserLocation;