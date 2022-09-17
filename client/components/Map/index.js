import React, {useState, useRef} from 'react';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer, Autocomplete } from '@react-google-maps/api';
import './Map.css';




function Map() {
    const [mapState, setMapState] = useState(/** @type google.maps.Map */)
    const originRef = useRef();
    const destinationRef = useRef();
    const centerRef = useRef({lat: -28.024, lng: 140.88})


    const center = { lat: -28.024, lng: 140.887 }

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
        googleMapsApiKey: process.env.GOOGLE_API_KEY,
        libraries: ['places']
    });



    if (!isLoaded) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {

        return (
            <div>
                <Autocomplete>
                    <input type='text' placeholder='Origin' />
                </Autocomplete>
                <Autocomplete>
                    <input type='text' placeholder='Destination' />
                </Autocomplete>
                <button onClick={()=>{mapState.panTo(centerRef.current)}}>Center</button>
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
                        {/*<MarkerClusterer>*/}
                        {/*    {(clusterer) =>*/}
                        {/*        locations.map((location) => (*/}
                        {/*            <Marker key={createKey(location)} position={location} clusterer={clusterer} />*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</MarkerClusterer>*/}
                    </GoogleMap>
            </div>
        )
    }
};

export default Map;