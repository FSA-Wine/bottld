import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

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
let dataObj = {}

class UserGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: 'rgba(89, 110, 113, .5)',
            borderColor: 'rgba(171, 170, 139, .5)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(97, 116, 71, .5)',
            hoverBorderColor: 'rgba(255,99,132,1)',
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
    let wines = this.props.likedWine
    if (wines) {
      wines.map(wine => {
        let curWine = wine._fields[0].properties
        curWine.descriptors.map(el => {
          let label = el
            .slice(0, 1)
            .toUpperCase()
            .concat(el.slice(1))
          if (!dataObj[label]) {
            dataObj[label] = 1
          }
          dataObj[label] += 1
        })
      })
      let max = 0
      for (let label in dataObj) {
        if (dataObj[label] >= max) {
          max = dataObj[label]
          labelData.unshift(label)
          numData.unshift(dataObj[label])
        } else {
          labelData.push(label)
          numData.push(dataObj[label])
        }
      }
    }
    this.getChartData()
  }

  getChartData() {
    let chartData = { ...this.state.chartData }
    if (labelData.length > 10) {
      chartData.labels = labelData.slice(0, 10)
      chartData.datasets[0].data = numData.slice(0, 10)
    } else {
      chartData.labels = labelData
      chartData.datasets[0].data = numData
    }
    this.setState({ chartData })
  }

  render() {
    console.log('data?', dataObj)
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
            },
            legend: {
              display: this.props.displayLegend,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    display: false,
                  },
                },
              ],
            },
          }}
          width={75}
          height={50}
        />
      </div>
    )
  }
}

export default UserGraph
