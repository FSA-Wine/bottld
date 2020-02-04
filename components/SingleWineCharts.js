import React, { Component } from "react";
//import { render } from '@testing-library/react';
import SingleWineMap from "./SingleWineMap";
import PolarGraph from "./PolarGraph";

let backgroundColorData = [
  "rgba(89, 110, 113, .5)",
  "rgba(97, 116, 71, .5)",
  "rgba(171, 170, 139, .5)",
  "rgba(230, 221, 152, .5)",
  "rgba(178, 157, 100, .5)"
];
let labelData = [];
let fakelabelData = ["Nutty", "Fruit", "Spice", "Body", "Caramel"];
let fakeNumData = [10, 8, 7, 3, 2];
let numData = [];

class SingleWineCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: backgroundColorData
          }
        ]
      },
      singleWine: [
        {
          _fields: [
            {
              properties: {
                country: "France",
                province: "Champagne",
                variety: "Champagne Blend",
                description:
                  "This is a full in the mouth, forward and fruity rosé, that is all fresh acidity and lively, crisp flavors. It has a light, zesty texture and the merest hint of toastiness. Drink now or give it a year's bottle aging.",
                winery: "Dampierre",
                title:
                  "Dampierre NV Cuvée des Ambassadeurs Brut Rosé (Champagne)"
              },
              points: { low: 91, high: 0 }
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    let charData = this.props.flavorData;
    if (charData) {
      charData.map(el => {
        labelData.push(el._fields[0]);
        numData.push(el._fields[1].low);
      });
    }
    console.log("char?", charData);
    console.log("data?", labelData);
    this.getChartData();
  }

  getChartData() {
    let chartData = { ...this.state.chartData };
    chartData.labels = labelData;
    chartData.datasets[0].data = numData;
    this.setState({ chartData });
  }

  render() {
    console.log("flavordata?", this.state);
    return (
      <div>
        <div>
          <SingleWineMap />
        </div>
        <div className="chart-container">
          <p className="sm-gray">FLAVOR PROFILE</p>
          <div className="polar-container">
            <PolarGraph chartData={this.state.chartData} />
          </div>
        </div>
      </div>
    );
  }
}

export default SingleWineCharts;
