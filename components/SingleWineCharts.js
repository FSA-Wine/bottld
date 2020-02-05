import React, { Component } from 'react'
//import { render } from '@testing-library/react';
// import SingleWineMap from './SingleWineMap'
import PolarGraph from './PolarGraph'
import dynamic from 'next/dynamic'

let backgroundColorData = [
  'rgba(89, 110, 113, .5)',
  'rgba(97, 116, 71, .5)',
  'rgba(171, 170, 139, .5)',
  'rgba(230, 221, 152, .5)',
  'rgba(178, 157, 100, .5)',
]
let labelData = []
let fakelabelData = ['Nutty', 'Fruit', 'Spice', 'Body', 'Caramel']
let numData = []

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
            backgroundColor: backgroundColorData,
          },
        ],
      },
    }
  }

  componentDidMount() {
    let charData = this.props.flavorData
    if (charData) {
      charData.map(el => {
        labelData.push(
          el._fields[0]
            .slice(0, 1)
            .toUpperCase()
            .concat(el._fields[0].slice(1))
        )
        numData.push(el._fields[1].low)
      })
    }
    this.getChartData()
  }

  getChartData() {
    let chartData = { ...this.state.chartData }
    chartData.labels = labelData
    chartData.datasets[0].data = numData
    this.setState({ chartData })
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
            <PolarGraph chartData={this.state.chartData} />
          </div>
        </div>
      </div>
    )
  }
}

export default SingleWineCharts
