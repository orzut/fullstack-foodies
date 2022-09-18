import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, Autocomplete, DirectionsRenderer, Circle } from '@react-google-maps/api';
import Rating from './Rating';
import DeliveryTime from './DeliveryTime';
import './Map.css';




function Map() {
    const [mapState, setMapState] = useState(/** @type google.maps.Map */)
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const originRef = useRef();
    const destinationRef = useRef();
    const centerRef = useRef({lat: -28.024, lng: 140.88})
    const librariesRef = useRef(['places'])
    const locations = [
        {lat: -28.024, lng: 140.88},
        {lat: -28.034, lng: 140.88},
        {lat: -28.044, lng: 140.88},
        {lat: -28.054, lng: 140.88},
        { lat: -31.56391, lng: 147.154312 },
        { lat: -33.718234, lng: 150.363181 },
        { lat: -33.727111, lng: 150.371124 },
        { lat: -33.848588, lng: 151.209834 },
        { lat: -33.851702, lng: 151.216968 },
        { lat: -34.671264, lng: 150.863657 },
        { lat: -35.304724, lng: 148.662905 },
        { lat: -36.817685, lng: 175.699196 },
        { lat: -36.828611, lng: 175.790222 },
        { lat: -37.75, lng: 145.116667 },
        { lat: -37.759859, lng: 145.128708 },
        { lat: -37.765015, lng: 145.133858 },
        { lat: -37.770104, lng: 145.143299 },
        { lat: -37.7737, lng: 145.145187 },
        { lat: -37.774785, lng: 145.137978 },
        { lat: -37.819616, lng: 144.968119 },
        { lat: -38.330766, lng: 144.695692 },
        { lat: -39.927193, lng: 175.053218 },
        { lat: -41.330162, lng: 174.865694 },
        { lat: -42.734358, lng: 147.439506 },
        { lat: -42.734358, lng: 147.501315 },
        { lat: -42.735258, lng: 147.438 },
        { lat: -43.999792, lng: 170.463352 },
    ]

    const createKey = (location) => {
        return location.lat + location.lng
    }

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

    if (!isLoaded) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return (
            <div className='flex flex-row '>
                <div className=''>
                    <Autocomplete>
                        <input type='text' placeholder='Origin' ref={originRef} />
                    </Autocomplete>
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
                        <button onClick={()=>{mapState.panTo(centerRef.current)}}>Center</button>
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
                <div>
                    <GoogleMap
                        zoom={10}
                        center={centerRef.current}
                        mapContainerClassName='map-container'
                        options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false
                        }}
                        onLoad={map=>setMapState(map)}
                    >
                        <Marker position={centerRef.current} />
                        <Marker position={locations[1]} />
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
            </div>
        )
    }
};

export default Map;