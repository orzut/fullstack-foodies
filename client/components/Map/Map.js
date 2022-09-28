import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, Autocomplete, DirectionsRenderer, Circle, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {fetchRestaurants, setUserLocation} from "../../store"
import Rating from './Rating';
import FilterSlider from './FilterSlider';
import RestaurantModal from './RestaurantModal';
import './Map.css';

function Map() {
    const [mapState, setMapState] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [displayRestaurants, setDisplayRestaurants] = useState([]);
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [destination, setDestination] = useState({lat: null, lng: null})
    const [activeMarker, setActiveMarker] = useState(null);
    const [isRestaurantModalActive, setIsRestaurantModalActive] = useState(false);
    const [restaurantModalDisplay,setRestaurantModalDisplay] = useState();
    const [filterParams, setFilterParams] = useState({score:0, priceRange:0, deliveryTime:60, distance: 20});
    const librariesRef = useRef(['places'])
    const userLocation = useSelector(state=> state.location)
    const restaurants = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(userLocation).length===0) {
            navigator.geolocation.getCurrentPosition(position => {
                dispatch(setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }))
            })
        }
        dispatch(fetchRestaurants())
    },[JSON.stringify(userLocation)])

    useEffect(()=>{
        console.log(filterParams)
        setDisplayRestaurants(filterRestaurants(restaurants,userLocation,filterParams.deliveryTime,filterParams.distance,filterParams.score).slice(0,100))
    },[restaurants, JSON.stringify(userLocation), JSON.stringify(filterParams)])

    useEffect(() => {
        calculateRoute()
    },[JSON.stringify(destination)])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAGo2NE7sdqcMdbrfboJ1AnbWiAljSl_lI',
        libraries: librariesRef.current
    });

    const calculateRoute = async () => {
        let results;
        if ((userLocation.lat===null) || (destination.lat===null)) {
            return
        } else {
            const directionsService = new google.maps.DirectionsService();
            results = await directionsService.route({
                origin: userLocation,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            })
        }
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    const clearRoute = () => {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
    }

    const getDistanceFromLatLng = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2-lat1);  // deg2rad below
        const dLon = deg2rad(lon2-lon1);
        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c; // Distance in km
        return d;
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI/180)
    }

    const filterRestaurants = (restaurants, center, deliveryTimeLimit, distanceLimit, scoreLimit) => {
        const filteredRestaurants = []
        restaurants.forEach(restaurant => {
            const distance = getDistanceFromLatLng(restaurant.lat,restaurant.lng,center.lat,center.lng);
            const deliveryTime = 3*getDistanceFromLatLng(restaurant.lat,restaurant.lng,center.lat,center.lng);
            const score = restaurant.score;
            if ((distance<=distanceLimit)&&(deliveryTime<=deliveryTimeLimit)&&(score>=scoreLimit)) {
                filteredRestaurants.push({distance, restaurant});
                console.log(restaurant)
            }
        });
        filteredRestaurants.sort(distanceComparison)
        return filteredRestaurants.map(item=>item.restaurant)
    }

    const distanceComparison = (a, b) => {
        if (a.distance < b.distance) {
            return -1
        } else if (a.distance > b.distance) {
            return 1
        } else {
            return 0
        };
    }

    const handleActiveMarker = (marker) => {
        /** marker is restaurant.id */
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
        const selectedRestaurant = restaurants.find(restaurant=>restaurant.id===marker)
        setDestination({lat:selectedRestaurant.lat, lng:selectedRestaurant.lng})
    };

    const handleRestaurantMenuActive = (restaurantId) => {
        setIsRestaurantModalActive(true);
        setRestaurantModalDisplay(restaurantId);
    };

    if (!isLoaded) {
        return (
            <div>
                Loading...
            </div>
        )
    } else if (Object.keys(userLocation).length===0) {
        return (
            <div>
                Awaiting user location...
            </div>
        )
    } else {
        return (
            <div>
                <div className="breadcrumb-section breadcrumb-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>Locate your restaurant selections</p>
                                <h1>Food Delivery Map</h1>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <br></br>
                <div className='map-wrapper'>
                    <div className='selection-menu'>
                        <div className='map-buttons'>
                            <div className='map-center-button'>
                                <button onClick={()=>{mapState.panTo(userLocation)}}>Center</button>
                            </div>

                            <div className='route-clear-button'>
                                <button onClick={clearRoute}>Clear Map</button>
                            </div>
                        </div>
                        <div className='restaurant-filter-wrapper'>
                            <div className='restaurant-filter-title'>Filter</div>
                            <div>Rating</div>
                            <Rating rating={filterParams.score} setRating={setFilterParams} ratingType={'score'}/>
                            <div>Price Range</div>
                            <Rating />
                            <div className='restaurant-filter-deliver-time'>Delivery Time</div>
                            <div className='filter-slider'>
                                <FilterSlider sliderVal={filterParams.deliveryTime} setSliderVal={setFilterParams} min={0} max={60} defaultValue={60} sliderType={'deliveryTime'}/>
                            </div>
                            <div className='restaurant-filter-distance'>Distance</div>
                            <div className='filter-slider'>
                                <FilterSlider sliderVal={filterParams.distance} setSliderVal={setFilterParams} min={0} max={20} defaultValue={20} sliderType={'distance'}/>
                            </div>
                        </div>
                    </div>
                    <div className='map-container-wrapper'>
                        <GoogleMap
                            zoom={10}
                            center={userLocation}
                            mapContainerClassName='map-container'
                            options={{
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: false
                            }}
                            onLoad={map=>setMapState(map)}
                            onClick={() => setActiveMarker(null)}
                        >
                            <Marker position={{lat:parseFloat(userLocation.lat),lng:parseFloat(userLocation.lng)}}
                                    icon={{
                                        path: google.maps.SymbolPath.CIRCLE,
                                        fillColor: "yellow",
                                        fillOpacity: 0.9,
                                        scale: 7,
                                        strokeColor: "blue",
                                        strokeWeight: 4,
                                    }}
                            />
                            {displayRestaurants.map((restaurant)=>{
                                return (
                                    <Marker
                                        key={restaurant.id}
                                        position={{lat:parseFloat(restaurant.lat), lng:parseFloat(restaurant.lng)}}
                                        onClick={()=>{handleActiveMarker(restaurant.id)}}
                                    >
                                        {activeMarker === restaurant.id ? (
                                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                                <div onClick={()=>handleRestaurantMenuActive(restaurant.id)} className='marker-info'>{restaurant.name}</div>
                                            </InfoWindow>
                                        ) : null}
                                    </Marker>
                                )
                            })}

                            {directionsResponse && ( <DirectionsRenderer directions={directionsResponse} /> )}
                        </GoogleMap>
                    </div>
                    <div className={`restaurant-modal ${isRestaurantModalActive? 'active':''}`}>
                        <RestaurantModal
                            setIsRestaurantModalActive={setIsRestaurantModalActive}
                            activeRestaurantId={restaurantModalDisplay}
                            distance={distance}
                            duration={duration}
                        />
                    </div>
                </div>
            </div>
        )
    }
};

export default Map;