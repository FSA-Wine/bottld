import React, { Component } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import { Image } from 'semantic-ui-react'
import { Nav } from 'reactstrap'

let latArr = []
let token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  'pk.eyJ1IjoicGx1aHJzZW4iLCJhIjoiY2s2OXM4ZTV6MGo1bjNrbjVlMm5rc2pkNyJ9.vp9mYcz8H3UGEPOXR0dnmA'

class UserMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: '50vw',
        height: '50vh',
        latitude: 18.31,
        longitude: -25.05,
        zoom: 1,
      },
    }
  }
  render() {
    let wines = this.props.likedWine
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={token}
        onViewportChange={viewport => this.setState({ ...viewport })}
        {...this.state.viewport}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '4px',
          }}>
          <NavigationControl />
        </div>
        {wines.map(cur => {
          let wine = cur._fields[0].properties
          let curLat = parseFloat(wine.latX)
          if (latArr.includes(curLat)) {
            let num = Math.random()
            curLat += num
            latArr.push(curLat)
          } else {
            latArr.push(curLat)
          }
          return (
            <Marker longitude={parseFloat(wine.longY)} latitude={curLat}>
              <Image src="/map-marker.png" width="25px" />
            </Marker>
          )
        })}
        {/* <Marker
          longitude={parseFloat(wines[0]._fields[0].properties.longY)}
          latitude={parseFloat(wines[0]._fields[0].properties.latX)}>
          <Image src="/map-marker.png" width="25px" />
        </Marker> */}
      </ReactMapGL>
    )
  }
}

export default UserMap
