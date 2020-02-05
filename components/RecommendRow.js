import React, { Component } from 'react'
import Link from 'next/link'
import { Card, Grid, Image } from 'semantic-ui-react'
import { trimParen, wineColor } from './utils'

//unsure where 'color' will be located once added

class RecommendRow extends Component {
  render() {
    
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
            <div>
              <h3>Similar wines:</h3>
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid centered stackable doubling columns={3}>
              {this.props.recWines.map(el => {
                let currentWineRec = el._fields[0].properties
                return (
                  <Grid.Column key={currentWineRec.id.low}>
                    <Card
                      style={{
                        margin: `0 auto`,
                      }}>
                      <Image
                        src="/wine-red-1-sm-label.png"
                        style={{ width: `50%`, margin: `0 auto` }}
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header style={{ height: `70px` }}>
                          <Link href="/wines/[id]" as={`/wines/${currentWineRec.id.low}`}>
                            <a>{trimParen(currentWineRec.title)}</a>
                          </Link>
                        </Card.Header>
                        <Card.Meta style={{ fontStyle: `italic` }}>
                          {currentWineRec.variety}
                        </Card.Meta>
                        <Card.Description>
                          {el._fields[0].properties.price
                            ? currentWineRec.price.toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                              })
                            : 'Price not available'}
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
