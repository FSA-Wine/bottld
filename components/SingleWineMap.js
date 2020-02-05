import React, { Component, Fragment } from 'react';
import { Image } from 'semantic-ui-react'
//import { Map, TileLayer, Marker, Popup, MarkerClusterGroup } from 'react-leaflet-universal';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import ReactMapGL, { Marker } from 'react-map-gl';

// type State = {
//     lat: number,
//     lng: number,
//     zoom: number,
// }

// export default class SingleWineMap extends Component {
//     constructor() {
//         super()
//         this.state = {
//             lat: 51.505,
//             lng: -0.09,
//             zoom: 13,
//         }
//     }

//     render() {
//         const position = [this.state.lat, this.state.lng]
//         return (
//             <Map center={position} zoom={this.state.zoom} style={{ width: `80%`, padding: `15px` }}>
//                 <TileLayer
//                     attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker position={position}>
//                     <Popup>
//                         A pretty CSS3 popup. <br /> Easily customizable.
//               </Popup>
//                 </Marker>
//             </Map>
//         )
//     }
// }

// const SingleWineMap = () => {
//     return (
//         <Image style={{ width: `80%`, padding: `15px` }} src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' centered circular />
//     )
// }

// const SingleWineMap = () => {
//     <Map>
//         () => {
//     //const MarkerClusterGroup = require('react-leaflet-markercluster').default;
//     return (
//       <div>
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <MarkerClusterGroup
//                 markers={[
//                     { position: [49.8397, 24.0297] },
//                     { position: [52.2297, 21.0122] },
//                     { position: [51.5074, -0.0901] },
//                 ]}
//             />
//         </div>
//         );
//       }
//  </Map>
// }

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN

class SingleWineMap extends Component {
    state = {
        viewport: {
            width: '100px',
            height: '100px',
            latitude: 41.5868,
            longitude: -93.625,
            zoom: 13
        }
    };

    render() {
        return (
            <Fragment>
                <ReactMapGL
                    // mapStyle="https://s3.amazonaws.com/cdn.brianbancroft.io/assets/osmstyle.json"
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
                    {...this.state.viewport}
                />
                {/* <Marker latitude={41.5868} longitude={-93.625} offsetLeft={-20} offsetTop={-10}></Marker> */}
                <ReactMapGL />
            </Fragment>
        );
    }
}

export default SingleWineMap;

// offsetLeft={-20} offsetTop={-10}
// onViewportChange={(viewport) => this.setState({ viewport })}