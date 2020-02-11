import React, { Component } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import { Image } from 'semantic-ui-react'

let latArr = []
let token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  'pk.eyJ1IjoicGx1aHJzZW4iLCJhIjoiY2s2OXM4ZTV6MGo1bjNrbjVlMm5rc2pkNyJ9.vp9mYcz8H3UGEPOXR0dnmA'

class UserMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: '100%',
        height: '30vh',
        latitude: 20.95,
        longitude: -42.62,
        zoom: 0,
      },
    }
  }
  render() {
    let wines = this.props.likedWine
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={token}
        onViewportChange={viewport => this.setState({ viewport })}
        {...this.state.viewport}>
        {wines.map((cur, i) => {
          let wine = cur._fields[0].properties
          let lat = parseFloat(wine.latX) + 1
          return (
            <Marker
              key={i}
              longitude={parseFloat(wine.longY)}
              latitude={lat}
              offsetLeft={-20}
              offsetTop={-10}>
              <Image src="/map-marker.png" width="15px" />
            </Marker>
          )
        })}
      </ReactMapGL>
    )
  }
}

export default UserMap
