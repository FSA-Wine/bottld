import React, { Component } from 'react'
//import { render } from '@testing-library/react';
// import SingleWineMap from './SingleWineMap'
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
    }
  }

  componentDidMount() {
    this.getChartData(this.props.flavorData)
  }

  componentDidUpdate(prevProps) {
    if (this.props.flavorData !== prevProps.flavorData) {
      console.log('should update')
      this.getChartData(this.props.flavorData)
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

  render() {
    return (
      <div>
        <div>
          <DynamicMap singleWine={this.props.singleWine} />
        </div>
        <div className="chart-container">
          <p className="sm-gray">FLAVOR PROFILE</p>
          <div className="polar-container">
            <PolarGraph chartData={this.state.chartData} wineId={this.props.wineId} />
          </div>
        </div>
      </div>
    )
  }
}

export default SingleWineCharts
