import React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './components/MapComponent'


class Application extends React.Component {
    
    constructor(props) {
        super(props);
       
    }

    componentDidMount() {
        
    }
    
    render() {
        // var geoData;
        return (
          <div>
            <MapComponent/>
            {/* <div ref={el => this.mapContainer = el} className='mapContainer' /> */}
          </div>
        )
    }
}
  
ReactDOM.render(<Application />, document.getElementById('app'));