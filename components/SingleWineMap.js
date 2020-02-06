import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import { Image } from 'semantic-ui-react'

let token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  'pk.eyJ1IjoicGx1aHJzZW4iLCJhIjoiY2s2OXM4ZTV6MGo1bjNrbjVlMm5rc2pkNyJ9.vp9mYcz8H3UGEPOXR0dnmA'

export default props => (
  <ReactMapGL
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxApiAccessToken={token}
    {...props.viewport}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '2px',
      }}></div>
    <Marker longitude={props.viewport.longitude} latitude={props.viewport.latitude}>
      <Image src="/map-marker.png" width="25px" />
    </Marker>
  </ReactMapGL>
)
