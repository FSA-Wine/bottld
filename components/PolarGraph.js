import React, { Component } from 'react'
import { Polar } from 'react-chartjs-2'

class PolarGraph extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    displayTitle: false,
    displayLegend: true,
  }

  render() {
    return (
      <div className="chart">
        <Polar
          data={this.props.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
            },
            legend: {
              display: this.props.displayLegend,
              onClick: null,
            },
            scale: {
              ticks: {
                display: false,
                stepSize: 2,
              },
            },
            tooltips: {
              displayColors: false,
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
