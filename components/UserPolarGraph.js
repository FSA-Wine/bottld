import React, { Component } from 'react'
import { Polar } from 'react-chartjs-2'

let backgroundColorData = [
  'rgba(89, 110, 113, .5)',
  'rgba(97, 116, 71, .5)',
  'rgba(171, 170, 139, .5)',
  'rgba(230, 221, 152, .5)',
  'rgba(178, 157, 100, .5)',
]
let labelData = []
let fakeLabelData = ['Nutty', 'Fruit', 'Spice', 'Body', 'Caramel']
let fakeNumData = [1, 2, 4, 6, 3]
let numData = []

class PolarGraph extends Component {
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

  static defaultProps = {
    displayTitle: false,
    displayLegend: false,
  }

  componentDidMount() {
    // let charData = this.props.flavorData
    // if (charData) {
    //   charData.map(el => {
    //     labelData.push(
    //       el._fields[0]
    //         .slice(0, 1)
    //         .toUpperCase()
    //         .concat(el._fields[0].slice(1))
    //     )
    //     numData.push(el._fields[1].low)
    //   })
    // }
    this.getChartData()
  }

  getChartData() {
    let chartData = { ...this.state.chartData }
    chartData.labels = fakeLabelData
    chartData.datasets[0].data = fakeNumData
    this.setState({ chartData })
  }

  render() {
    console.log('props?', this.props)
    return (
      <div className="chart">
        <Polar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
            },
            legend: {
              display: this.props.displayLegend,
            },
          }}
          width={100}
          height={50}
        />
      </div>
    )
  }
}

export default PolarGraph
