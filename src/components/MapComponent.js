import React from 'react'
import mapboxgl from 'mapbox-gl';
import { convertCsv } from '../utils/convertCsv';

mapboxgl.accessToken = 'pk.eyJ1Ijoicy1hLW4tIiwiYSI6ImNrOW1nYjczdDAwNDYzZnExNnQ5dm82czEifQ.esEYb5WXIpU-YAXEoA3usw';

// const map = new mapboxgl.Map({
//     container: this.mapContainer,
//     style: 'mapbox://styles/s-a-n-/ck9mp8gfz3xws1iqoqx12sqa0',
//     center: [this.state.lng, this.state.lat],
//     zoom: this.state.zoom
// });

export default class MapComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2,
            geoData: {}
        };

    }

    componentDidMount() {
        // var geoData;
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/s-a-n-/ck9mp8gfz3xws1iqoqx12sqa0',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        this.captureGeoData();
        // console.log(this.state.geoData)
        // map.on('load', function() {
        //     map.addSource('covidData', {
        //       type: 'geojson',
        //       data: this.captureGeoData()        //`this` undefined ?
        //     });
        // });
        map.on('move', () => {
            this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('load', () => {
            console.log(this.state.geoData)
            map.addSource('covid', {
            type: 'geojson',
            data: this.state.geoData
            });

            map.addLayer({
                id: 'covid-heat',
                type: 'heatmap',
                source: 'covid',
                maxzoom: 15,
                paint: {
                  // increase weight as diameter breast height increases
                  'heatmap-weight': {
                    property: 'dbh',
                    type: 'exponential',
                    stops: [
                      [1, 0],
                      [62, 1]
                    ]
                  },
                  // increase intensity as zoom level increases
                  'heatmap-intensity': {
                    stops: [
                      [11, 1],
                      [15, 3]
                    ]
                  },
                  // assign color values be applied to points depending on their density
                  'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(247,248,247,0)',
                    0.2, 'rgb(206,206,209)',
                    0.4, 'rgb(150,150,150)',
                    0.6, 'rgb(99,86,99)',
                    0.8, 'rgb(37,34,34)'
                  ],
                  // increase radius as zoom increases
                  'heatmap-radius': {
                    stops: [
                      [5, 10],
                      [10, 20]
                    ]
                  },
                  // decrease opacity to transition into the circle layer
                  'heatmap-opacity': {
                    default: 1,
                    stops: [
                      [14, 1],
                      [15, 0]   //to fade, if circle layer is to be added
                    ]
                  },
                }
              });
              
        });

        // doesnt work ?

        // map.on('click', 'covid-heat', function(e) {
        //     console.log("clicked")
        //     new mapboxgl.Popup()
        //       .setLngLat(e.features[0].geometry.coordinates)
        //       .setHTML('<b>DBH:</b> ' + e.features[0].properties.dbh)
        //       .addTo(map);
        // });

        
        // convertCsv().then((geoJsonData) => {
        //     console.log(geoJsonData)
        // })

        // const convertedData = await convertCsv();
        // console.log(convertedData)

        // convertCsv().then((data) => {
        //     console.log(data)
        // })
        // geoData = convertCsv().then((data) => {
        //     console.log(data)
        //     return data
        // })
        // // console.log(geoData) // promise pending
        // geoData.then(function(geoJsonData) {
        //     console.log(geoJsonData)
        // })
    }
    componentDidUpdate() {
        // this.captureGeoData();
        // console.log(this.state.geoData)
        
    }

    captureGeoData  = () => {
        // let geoData
        convertCsv().then((data) => {
            // console.log(data)
            // return data
            this.setState({geoData: data})
        })
    }
    render() {
        return (
          <div>
            <div className='sidebarStyle'>
              <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
              {/* {this.captureGeoData()} */}
              {/* {console.log(this.state.geoData)} */}
            </div>
            <div ref={el => this.mapContainer = el} className='mapContainer' />
          </div>
        )
    }
}