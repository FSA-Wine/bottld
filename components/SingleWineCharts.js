import React, { Component } from 'react';
//import { render } from '@testing-library/react';
import SingleWineMap from './SingleWineMap'
import PolarGraph from './PolarGraph'

class SingleWineCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            singleWine: [{
                _fields: [{
                    properties: {
                        country: "France", province: "Champagne", variety: "Champagne Blend", description: "This is a full in the mouth, forward and fruity rosé, that is all fresh acidity and lively, crisp flavors. It has a light, zesty texture and the merest hint of toastiness. Drink now or give it a year's bottle aging.",
                        winery: "Dampierre",
                        title: "Dampierre NV Cuvée des Ambassadeurs Brut Rosé (Champagne)"
                    },
                    points: { low: 91, high: 0 }
                }]
            }]
        }
    }

    componentDidMount() {
        //this.props.fetchSingleWine(this.props.router.query.id);
        this.getChartData()
    }

    getChartData() {
        this.setState({
            chartData: {
                labels: [
                    "Nutty",
                    "Fruit",
                    "Spice",
                    "Body",
                    "Caramel"
                ],
                datasets: [{
                    data: [
                        10,
                        8,
                        7,
                        3,
                        2
                    ],
                    backgroundColor: [
                        "rgba(89, 110, 113, .5)",
                        "rgba(97, 116, 71, .5)",
                        "rgba(171, 170, 139, .5)",
                        "rgba(230, 221, 152, .5)",
                        "rgba(178, 157, 100, .5)"
                    ],
                }]
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    <SingleWineMap />
                </div>
                <div className="chart-container">
                    <p className='sm-gray'>FLAVOR PROFILE</p>
                    <div className='polar-container' >
                        <PolarGraph chartData={this.state.chartData} />
                    </div>
                </div>
            </div>
        )
    }

}

export default SingleWineCharts;