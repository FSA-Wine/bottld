import React, { Component } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL from 'react-map-gl'

let token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  'pk.eyJ1IjoicGx1aHJzZW4iLCJhIjoiY2s2OXM4ZTV6MGo1bjNrbjVlMm5rc2pkNyJ9.vp9mYcz8H3UGEPOXR0dnmA'

class SingleWineMap extends Component {
  state = {
    viewport: {
      width: '25vw',
      height: '25vh',
      latitude: 41.5868,
      longitude: -93.625,
      zoom: 5,
    },
  }

  componentDidMount() {
    let curWine = this.props.singleWine
    let viewport = { ...this.state.viewport }
    viewport.latitude = parseFloat(curWine.latX)
    viewport.longitude = parseFloat(curWine.longY)
    this.setState({ viewport })
  }
  componentDidUpdate() {
    let curWine = this.props.singleWine
    if (this.state.viewport.latitude !== parseFloat(curWine.latX)) {
      let viewport = { ...this.state.viewport }
      viewport.latitude = parseFloat(curWine.latX)
      viewport.longitude = parseFloat(curWine.longY)
      this.setState({ viewport })
    }
  }
  render() {
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={token}
        {...this.state.viewport}
      />
    )
  }
}

export default SingleWineMap
