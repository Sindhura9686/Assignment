import React, { useState, useEffect } from 'react';
import MapContainer from "./Components/MapContainer";
import axios from 'axios'; 

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [pastLocations, setPastLocations] = useState([]);

  useEffect(() => {
    // Use Geolocation API to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Add the user's current location as a past location
          addPastLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
console.log(userLocation)
    // Fetch data after getting the user's location
    if (userLocation) {
      fetchRestaurants(userLocation);
      fetchPastLocations();
    }
  }, [userLocation]);
  
  const fetchRestaurants = async (userLocation) => {
    try {
      const { lat, lng } = userLocation;
      const apiKey ="AIzaSyCLyNpaA2cv07CybPd8Zzx22NV3geoxnOM"
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${apiKey}`;
      const response = await axios.get(url);
      console.log(response.data);
      const data = await response.json();
      setRestaurants(data.results);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };
  
  const fetchPastLocations = async () => {
    try {
      
      const url = 'http://localhost:5000/api/past-locations';
      const response = await fetch(url);
      const data = await response.json();
      setPastLocations(data);
    } catch (error) {
      console.error('Error fetching past locations:', error);
    }
  };
  const addPastLocation = async (location) => {
    try {
      // Add past location to the backend
      await axios.post('http://localhost:5000/api/past-locations', location);
      
      fetchPastLocations();
    } catch (error) {
      console.error('Error adding past location:', error);
    }
  };



  return (
    <div>
      <div>
      <h1>Restaurant Finder</h1>
      {userLocation && <MapContainer restaurants={restaurants} userLocation={userLocation} />}

    </div>
         {/* Display only the past 10 locations */}
         {pastLocations.length > 0 && (
        <div>
          <h2>Last 10 Past Locations:</h2>
          <ul>
            {pastLocations
              .slice(-10) // Slice the last 10 locations from the array
              .map((location, index) => (
                <li key={index}>
                  Latitude: {location.lat}, Longitude: {location.lng}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;

