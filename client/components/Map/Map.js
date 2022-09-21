import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, Autocomplete, DirectionsRenderer, Circle, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {fetchRestaurants} from "../../store"
import Rating from './Rating';
import DeliveryTime from './DeliveryTime';
import RestaurantModal from './RestaurantModal';
import './Map.css';

function Map() {
    const [mapState, setMapState] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [displayRestaurants, setDisplayRestaurants] = useState([]);
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [center, setCenter] = useState({lat: 0, lng: 0})
    const [activeMarker, setActiveMarker] = useState(null);
    const [isRestaurantModalActive, setIsRestaurantModalActive] = useState(false);
    const [restaurantModalDisplay,setRestaurantModalDisplay] = useState();
    const originRef = useRef();
    const destinationRef = useRef();
    const librariesRef = useRef(['places'])
    const restaurants = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
        dispatch(fetchRestaurants())
    },[])

    useEffect(()=>{
        setDisplayRestaurants(filterRestaurants(restaurants,center,500).slice(0,20))
    },[restaurants, center])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAGo2NE7sdqcMdbrfboJ1AnbWiAljSl_lI',
        libraries: librariesRef.current
    });

    const calculateRoute = async () => {
        let results;
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        } else {
            const directionsService = new google.maps.DirectionsService();
            results = await directionsService.route({
                origin: originRef.current.value,
                destination: destinationRef.current.value,
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
        originRef.current.value = ''
        destinationRef.current.value = ''
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

    const filterRestaurants = (restaurants, center, distanceLimit) => {
        const filteredRestaurants = []
        restaurants.forEach(restaurant => {
            const distance = getDistanceFromLatLng(restaurant.lat,restaurant.lng,center.lat,center.lng);
            if (distance<distanceLimit) {
                filteredRestaurants.push({distance, restaurant});
            }
        });
        console.log(filteredRestaurants)
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

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        const results = await getGeocode({ address: originRef.current.value })
        const latLng = getLatLng(results[0]);
        setCenter(latLng)
    }

    const handleActiveMarker = (marker) => {
        /** marker is restaurant.id */
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
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
    } else {
        return (
            <div className='map-wrapper'>
                <div className='selection-menu'>
                    <form onSubmit={handleSubmit}>
                        <Autocomplete>
                            <input type='text' placeholder='Origin' ref={originRef} />
                        </Autocomplete>
                        <button type='submit'>Search</button>
                    </form>
                    <Autocomplete>
                        <input type='text' placeholder='Destination' ref={destinationRef}/>
                    </Autocomplete>
                    <div>
                        <button onClick={calculateRoute}>Calculate Route</button>
                    </div>
                    <div>
                        <button onClick={clearRoute}>Clear Route</button>
                    </div>
                    <div>
                        <button onClick={()=>{mapState.panTo(center)}}>Center</button>
                    </div>
                    <div>Distance: {distance}</div>
                    <div>Duration: {duration}</div>
                    <div>Rating</div>
                    <Rating />
                    <div>Price Range</div>
                    <Rating />
                    <div>Delivery Time</div>
                    <DeliveryTime />
                    <div>Distance</div>
                    <DeliveryTime />
                </div>
                <div className='map-container-wrapper'>
                    <GoogleMap
                        zoom={10}
                        center={center}
                        mapContainerClassName='map-container'
                        options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false
                        }}
                        onLoad={map=>setMapState(map)}
                        onClick={() => setActiveMarker(null)}
                    >
                        <Marker position={center}
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
                        {/*<MarkerClusterer>*/}
                        {/*    {(clusterer) =>*/}
                        {/*        locations.map((location) => (*/}
                        {/*            <Marker key={createKey(location)} position={location} clusterer={clusterer} />*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</MarkerClusterer>*/}
                    </GoogleMap>
                </div>
                <div className={`restaurant-modal ${isRestaurantModalActive? 'active':''}`}>
                    <RestaurantModal
                        setIsRestaurantModalActive={setIsRestaurantModalActive}
                        activeRestaurantId={restaurantModalDisplay}
                    />
                </div>
            </div>
        )
    }
};

export default Map;