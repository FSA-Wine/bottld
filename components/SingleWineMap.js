import React, { Component } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL from 'react-map-gl'

let token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  'pk.eyJ1IjoicGx1aHJzZW4iLCJhIjoiY2s2OXM4ZTV6MGo1bjNrbjVlMm5rc2pkNyJ9.vp9mYcz8H3UGEPOXR0dnmA'

export default props => (
  <ReactMapGL
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxApiAccessToken={token}
    {...props.viewport}
  />
)
