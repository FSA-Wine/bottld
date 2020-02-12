import React, { Component } from 'react'
import Link from 'next/link'
import { Card, Grid, Image } from 'semantic-ui-react'
import { trimParen, wineColor, wineLabelImg } from './utils'
import ErrorUserNoResults from './ErrorUserNoResults'

//unsure where 'color' will be located once added

class RecommendRow extends Component {
  render() {
    //will need to add conditional for loading
    //cards Link to SingleWine page
    return (
      <div>
        <Grid>
          <Grid.Row>
            <div>
              <h3 style={{ fontStyle: `italic` }}>{this.props.info}</h3>
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid centered stackable columns={5}>
              {this.props.recWines.length ? (
                this.props.recWines.map(el => {
                  let currentWineRec = el._fields[0].properties
                  return (
                    <Grid.Column key={currentWineRec.id.low}>
                      <Card
                        style={{
                          margin: `0 auto`,
                          borderTop: `5px solid ${wineColor(currentWineRec.color)}`,
                          borderTopLeftRadius: `0`,
                          borderTopRightRadius: `0`,
                        }}>
                        <Image
                          src={wineLabelImg(currentWineRec.color)}
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
                              ? currentWineRec.price
                                  .toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'USD',
                                  })
                                  .slice(0, -3)
                              : 'Price not available'}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  )
                })
              ) : (
                // <section style={{ margin: `0 auto`, paddingTop: `12vh` }}>
                <Grid.Row>
                  <ErrorUserNoResults />
                </Grid.Row>
                // </section>
              )}
            </Grid>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default RecommendRow
