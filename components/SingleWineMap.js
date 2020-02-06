import React from 'react'
import { Image } from 'semantic-ui-react'
import 'mapbox-gl/dist/mapbox-gl.css'

// const SingleWineMap = props => {
//   return (
//     <Image
//       style={{ width: `85%`, padding: `15px` }}
//       src="https://react.semantic-ui.com/images/wireframe/square-image.png"
//       //   size="mini"
//       centered
//       circular
//     />
//   )
// }
let token = process.env.MAPBOX_TOKEN
import { Component } from 'react'
import ReactMapGL from 'react-map-gl'

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
        mapboxApiAccessToken="pk.eyJ1IjoicGx1aHJzZW4iLCJhIjoiY2s2OXM4ZTV6MGo1bjNrbjVlMm5rc2pkNyJ9.vp9mYcz8H3UGEPOXR0dnmA"
        // onViewportChange={viewport => this.setState({ viewport })}
        {...this.state.viewport}
      />
    )
  }
}

export default SingleWineMap
