import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './index.css';
import App from './App';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWszNjMiLCJhIjoiY2tpOGZhNThpMDU2MjJybzQ0aWllamxlMiJ9.xhj18kr59w3QBI6--qGC0A';

ReactDOM.render(
    <div>
      <App/>
    </div>
    
  ,
  document.getElementById('root')
);

