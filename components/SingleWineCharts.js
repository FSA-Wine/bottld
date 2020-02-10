import React, { Component } from 'react'
import PolarGraph from './PolarGraph'
import dynamic from 'next/dynamic'

let backgroundColor = [
  'rgba(89, 110, 113, .5)',
  'rgba(97, 116, 71, .5)',
  'rgba(171, 170, 139, .5)',
  'rgba(230, 221, 152, .5)',
  'rgba(178, 157, 100, .5)',
]

const DynamicMap = dynamic(() => import('./SingleWineMap'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

class SingleWineCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor,
          },
        ],
      },
      viewport: {
        width: '25vw',
        height: '25vh',
        latitude: 41.5868,
        longitude: -93.625,
        zoom: 5,
      },
    }
  }

  componentDidMount() {
    this.getChartData(this.props.flavorData)
    this.setView(this.props.singleWine)
  }

  componentDidUpdate(prevProps) {
    if (this.props.flavorData !== prevProps.flavorData) {
      this.getChartData(this.props.flavorData)
    }
    if (
      this.state.viewport.latitude !== parseFloat(this.props.singleWine.latX) ||
      this.state.viewport.longitude !== parseFloat(this.props.singleWine.longY)
    ) {
      this.setView(this.props.singleWine)
    }
  }

  getChartData(flavorData) {
    if (flavorData) {
      let labelData = []
      let numData = []
      flavorData.map(el => {
        labelData.push(
          el._fields[0]
            .slice(0, 1)
            .toUpperCase()
            .concat(el._fields[0].slice(1))
        )
        numData.push(el._fields[1].low)
      })
      let chartData = { ...this.state.chartData }
      chartData.labels = labelData
      chartData.datasets[0].data = numData
      this.setState({ chartData })
    }
  }

  setView(wine) {
    let viewport = { ...this.state.viewport }
    viewport.latitude = parseFloat(wine.latX)
    viewport.longitude = parseFloat(wine.longY)
    this.setState({ viewport })
  }

  render() {
    // console.log('props', this.props)
    return (
      <div>
        {this.props.singleWine.latX ? (
          <div>
            <DynamicMap viewport={this.state.viewport} />
          </div>
        ) : (
          <div></div>
        )}
        <div className="chart-container">
          <p className="sm-gray">FLAVOR PROFILE</p>
          <div className="polar-container">
            <PolarGraph chartData={this.state.chartData} />
          </div>
        </div>
      </div>
    )
  }
}

export default SingleWineCharts
