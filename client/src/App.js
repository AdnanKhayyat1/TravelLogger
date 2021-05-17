import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries,deleteLogEntry } from './API';
import LogEntryForm from './logEntryForm';
// 3:18:04 
const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null); //by default there is no add entry form (yet).
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });
  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };
  // useEffect called once when component is mounted.
  useEffect(() => {
    getEntries();
  }, []); //IFY - because useEffect cannot be async
 
  const showAddMarkerPopup = (ev) => {
    const [ longitude,latitude ] = ev.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    });

  };
  return (
    <ReactMapGL
    {...viewport}
    mapStyle="mapbox://styles/ak363/ckme7t506gdp017r1341nvtp8"
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={setViewport}
    onDblClick={showAddMarkerPopup}
    >
      {
        
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude} 
              longitude={entry.longitude} 
            >
              <div 
                onClick={() => setShowPopup({
                  //...showPopup,
                  [entry._id]: true
                })}
              >
                <svg 
                  className="marker" 
                  style={{
                    width: `${12 * viewport.zoom}px`,
                    height: `${12 * viewport.zoom}px`
                  }}
                  viewBox="0 0 24 24"  
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup({})}
                  anchor="top">
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    {entry.image && <img src={entry.image} alt={entry.title}/>}
                    <p>Rating: {entry.rating}/10</p>
                    <p>{entry.comment}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    <button
                      onClick={ () => {
                        deleteLogEntry(entry);
                        setShowPopup({});
                        getEntries();
                      }
                      }
                    >Delete Entry</button>
                  </div>
                  </Popup>
              ) : null
            }
            </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <React.Fragment>
            <Marker
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude} 
            >
              <div>
                <svg 
                  className="marker" 
                  style={{
                    width: `${12 * viewport.zoom}px`,
                    height: `${12 * viewport.zoom}px`
                  }}
                  viewBox="0 0 24 24"  
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
            </Marker>
            <Popup
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setAddEntryLocation(null)}
                anchor="top">
                <div className="popup">
                  <LogEntryForm onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation}/>
                </div>
            </Popup>
          </React.Fragment>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;