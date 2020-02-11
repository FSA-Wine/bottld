import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import { Button, Icon, Card, Grid, Image } from 'semantic-ui-react'
import { trimParen, wineColor, wineLabelImg } from './utils'
import ErrorNoResults from './ErrorNoResults'
import 'react-alice-carousel/lib/alice-carousel.css'
import AliceCarousel from 'react-alice-carousel'

//unsure where 'color' will be located once added

class RecommendRow extends Component {
  render() {
    //will need to add conditional for loading
    //cards Link to SingleWine page
    const galleryItems = this.props.recWines.map(el => {
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
              <Card.Meta style={{ fontStyle: `italic` }}>{currentWineRec.variety}</Card.Meta>
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

    const responsive = {
      0: { items: 1 },
      1024: { items: 3 },
    }

    // <Grid centered stackable columns={3}>
    // </Grid>

    return (
      <div>
        <Grid>
          <Grid.Row>
            <div>
              <h3 style={{ fontStyle: `italic` }}>{this.props.info}</h3>
            </div>
          </Grid.Row>
          {this.props.recWines.length ? (
            <Fragment>
              <Grid.Row>
                <AliceCarousel
                  items={galleryItems}
                  responsive={responsive}
                  autoPlayDirection="rtl"
                  fadeOutAnimation={true}
                  mouseTrackingEnabled={true}
                  disableAutoPlayOnAction={true}
                  dotsDisabled={true}
                  buttonsDisabled={true}
                  ref={el => (this.Carousel = el)}
                />
              </Grid.Row>
              <Grid.Row centered>
                <Button icon onClick={() => this.Carousel.slidePrev()}>
                  <Icon name="angle left" />
                </Button>
                <Button icon onClick={() => this.Carousel.slideNext()}>
                  <Icon name="angle right" />
                </Button>
              </Grid.Row>
            </Fragment>
          ) : (
            <section style={{ margin: `0 auto`, paddingTop: `12vh` }}>
              <ErrorNoResults />
            </section>
          )}
        </Grid>
      </div>
    )
  }
}

export default RecommendRow
