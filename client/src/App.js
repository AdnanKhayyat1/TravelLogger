import React from 'react';
import ReactDOM  from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './index.css';
import FormComp from './Form';
import FormGroup from 'react-bootstrap/esm/FormGroup';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWszNjMiLCJhIjoiY2tpOGZhNThpMDU2MjJybzQ0aWllamxlMiJ9.xhj18kr59w3QBI6--qGC0A';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
    });
    }
  render() {
    return (
      
      <div>
        <FormGroup/>

      </div>
    )
  }
}

export default App;