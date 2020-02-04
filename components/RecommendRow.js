import React, { Component } from 'react';
import Link from 'next/link';
import { Card, Grid, Image } from 'semantic-ui-react'
import { trimParen, wineColor } from './utils'


//unsure where 'color' will be located once added

class RecommendRow extends Component {
    render() {
        console.log('recrow', this.props)
        const fakeWineArr = [{
            _fields: [{
                identity: { low: 91, high: 0 },
                properties: {
                    country: "France", province: "Champagne", variety: "Champagne Blend", description: "This is a full in the mouth, forward and fruity rosé, that is all fresh acidity and lively, crisp flavors. It has a light, zesty texture and the merest hint of toastiness. Drink now or give it a year's bottle aging.",
                    winery: "Dampierre",
                    title: "Dampierre NV Cuvée des Ambassadeurs Brut Rosé (Champagne)",
                },
                points: { low: 91, high: 0 },
                color: 'white'
            }]
        }, {
            _fields: [{
                identity: { low: 4, high: 0 },
                properties: {
                    country: "Portugal", province: "Douro", variety: "Portuguese White", price: 20, description: "Toast, spice and juicy citrus flavors blend together in this crisp wine. Its acidity is prominent, giving plenty of freshness to a wine that is also tangy. With the toastiness now well integrated, the wine is ready to drink.",
                    winery: "Adega Vila Real",
                    title: "Adega Vila Real 2015 Grande Reserva White",
                },
                points: { low: 85, high: 0 },
                color: 'white'
            }]
        }, {
            _fields: [{
                identity: { low: 299, high: 0 },
                properties: {
                    country: "France", province: "Alsace", variety: "White Blend", price: 30, description: "A blend of 13 different grape varieties, some rare, this is a delicious, honeyed wine, with rich baked apple flavor and crisp acidity, topped with a creamed spice note. Its pure line of citrus provides a lively finish.",
                    winery: "Domaine Marcel Deiss",
                    title: "Domaine Marcel Deiss 2010 White",
                },
                points: { low: 90, high: 0 },
                color: 'rose'
            }]
        }, {
            _fields: [{
                identity: { low: 91, high: 0 },
                properties: {
                    country: "France", province: "Champagne", variety: "Champagne Blend", description: "This is a full in the mouth, forward and fruity rosé, that is all fresh acidity and lively, crisp flavors. It has a light, zesty texture and the merest hint of toastiness. Drink now or give it a year's bottle aging.",
                    winery: "Dampierre",
                    title: "Dampierre NV Cuvée des Ambassadeurs Brut Rosé (Champagne)",
                },
                points: { low: 91, high: 0 },
                color: 'red'
            }]
        }, {
            _fields: [{
                identity: { low: 4, high: 0 },
                properties: {
                    country: "Portugal", province: "Douro", variety: "Portuguese White", price: 20, description: "Toast, spice and juicy citrus flavors blend together in this crisp wine. Its acidity is prominent, giving plenty of freshness to a wine that is also tangy. With the toastiness now well integrated, the wine is ready to drink.",
                    winery: "Adega Vila Real",
                    title: "Adega Vila Real 2015 Grande Reserva White",
                },
                points: { low: 85, high: 0 },
                color: 'white'
            }]
        }
        ]

        //             < Card style = {{
        //                 margin: `0 auto`, borderTop: `5px solid ${wineColor(el._fields[0].color)}`, borderTopLeftRadius: `0`,
        //                     borderTopRightRadius: `0`
        //     }
        // } >

        //will need to add conditional for loading
        //cards Link to SingleWine page

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <div><h3>{"We also think you'll like:"}</h3></div>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid centered stackable doubling columns={3}>
                            {this.props.recWines.map(el => {
                                return (
                                    <Grid.Column key={el._fields[1].identity.low} >
                                        <Card style={{
                                            margin: `0 auto`
                                        }} >
                                            <Image src='/wine-red-1-sm-label.png' style={{ width: `50%`, margin: `0 auto` }} wrapped ui={false} />
                                            <Card.Content>
                                                <Link href={`/wines/${el._fields[1].identity.low}`}>
                                                    <Card.Header style={{ height: `70px` }}>{trimParen(el._fields[1].properties.title)}</Card.Header></Link>
                                                <Card.Meta style={{ fontStyle: `italic` }}>{el._fields[1].properties.variety}</Card.Meta>
                                                <Card.Description>
                                                    {el._fields[1].properties.price ? `$${el._fields[1].properties.price}` : "Price not available"}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                )
                            })}
                        </Grid>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default RecommendRow
