// YOUR_GOOGLE_MAPS_API_KEY:AIzaSyBFAra1BWnWBEkakuOfmTw3UH43bB9f00w

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({ restaurants, userLocation }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCLyNpaA2cv07CybPd8Zzx22NV3geoxnOM">
      <GoogleMap mapContainerStyle={mapStyles} center={userLocation} zoom={15}>
        {/* Add a marker for the user's current location */}
        {userLocation && <Marker position={userLocation} title="Your Location" />}

        {/* Add markers for restaurants */}
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            title={restaurant.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;

