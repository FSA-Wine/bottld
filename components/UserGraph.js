import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { fetchFlavors } from '../store/user'

const UserGraph = props => {
  const [chartData, setChartData] = useState({
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
  })

  const dispatch = useDispatch()
  const flavors = useSelector(state => state.user.flavors)
  const liked = useSelector(state => state.user.likedWines)

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchFlavors())
      updateChart()
    }
    loadData()
  }, [liked.length, flavors.length])

  const updateChart = () => {
    let labelData = []
    let numData = []
    flavors.forEach(flavor => {
      labelData.push(_.capitalize(_.replace(flavor._fields[0].properties.title, '_', ' ')))
      numData.push(flavor._fields[1].low)
    })
    setChartData(prevChart => {
      return {
        ...prevChart,
        labels: labelData,
        datasets: [{ ...prevChart.datasets[0], data: numData }],
      }
    })
  }

  return (
    <div className="chart">
      <Bar
        data={chartData}
        options={{
          title: {
            display: props.displayTitle,
          },
          legend: {
            display: props.displayLegend,
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

UserGraph.defaultProps = {
  displayTitle: false,
  displayLegend: false,
}

export default UserGraph
