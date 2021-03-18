import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });
  // useEffect called once when component is mounted.
  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })(); //IFY - because useEffect cannot be async
  }, []);
  return (
    <ReactMapGL
    {...viewport}
    mapStyle="mapbox://styles/ak363/ckme7t506gdp017r1341nvtp8"
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={setViewport}
    >
      {
        logEntries.map(entry => (
          <Marker
            key={entry._id}
            latitude={entry.latitude} 
            longitude={entry.longitude} 
          >
            <svg 
              className="marker" 
              style={{
                width: `${12 * viewport.zoom}px`,
                height: `${12 * viewport.zoom}px`
              }}
              viewBox="0 0 24 24"  
              stroke="currentColor" 
              stroke-width="2" 
              fill="none" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
          </Marker>
        ))
      }
    </ReactMapGL>
  );
}

export default App;