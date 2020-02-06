import React, { Component } from 'react'
import { Image, Popup } from 'semantic-ui-react'
import { trimParen, wineColor } from './utils'

class SingleWineDetails extends Component {
  constructor() {
    super()
    this.state = {
      likeWine: false,
    }
  }

  countryFlag = country => {
    switch (country) {
      case 'US':
        return '/US_flag.svg'
        break
      case 'Italy':
        return '/Italy_flag.svg'
        break
      case 'France':
        return '/France_flag.svg'
        break
      case 'Australia':
        return '/Australia_flag.svg'
        break
      case 'Germany':
        return '/German_flag.svg'
        break
      case 'Spain':
        return '/Spain_flag.svg'
        break
      case 'Turkey':
        return '/Turkey_flag.svg'
        break
      case 'Greece':
        return '/Greece_flag.svg'
        break
      case 'Austria':
        return '/Austria_flag.svg'
        break
      case 'Chile':
        return '/Chile_flag.svg'
        break
      case 'Canada':
        return '/Canada_flag.svg'
        break
      case 'South Africa':
        return '/SouthAfrica_flag.svg'
        break
      case 'Portugal':
        return '/Portugal_flag.svg'
        break
      default:
        return 'https://react.semantic-ui.com/images/wireframe/square-image.png'
    }
  }

  scoreComment = score => {
    switch (true) {
      case score > 80 && score < 83:
        return 'Acceptable'
        break
      case score < 87:
        return 'Good'
        break
      case score < 90:
        return 'Very Good'
        break
      case score < 94:
        return 'Excellent'
        break
      case score < 98:
        return 'Superb'
        break
      case score < 101:
        return 'Classic'
        break
      default:
        return ''
    }
  }

  toggleHeart = () => {
    this.setState(prevState => ({
      likeWine: !prevState.likeWine
    }));
  }

  render() {
    const singleWine = this.props.singleWine
    //let curWine = singleWine[0][0]._fields[0].properties;
    const price = singleWine.price
      ? singleWine.price.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
      : 'Not available'
    return (
      <div>
        <hr style={{ borderTop: `5px solid ${wineColor(singleWine.color)}` }} />
        <h2>{trimParen(singleWine.title)}</h2>
        <p>
          <span className="sm-gray">WINERY:</span> {singleWine.winery}
        </p>
        <p>
          <span className="sm-gray">VARIETY:</span> {singleWine.variety}
        </p>
        <p>
          <span className="sm-gray">ORIGIN:</span> {singleWine.province}, {singleWine.country}
        </p>
        <p>
          <span className="sm-gray">EST. PRICE:</span> {price}
        </p>
        <p>
          <span className="sm-gray">SCORE:</span>{' '}
          <span style={{ fontWeight: `bold` }}>{singleWine.points.low}</span> &nbsp;
          <span style={{ color: `gray` }}>{this.scoreComment(singleWine.points.low)}</span>
        </p>
        <Image
          style={{ width: `8%`, padding: `2px` }}
          src={this.countryFlag(singleWine.country)}
          //   size="mini"
          centered
          circular
        />
        <p>
          <Popup content={this.state.likeWine ? "You like this wine" : "Add to Liked Wines"}
            trigger={
              <Image src={this.state.likeWine
                ? ('/heart-solid.svg') :
                ('/heart-outline.svg')} width="20px" onClick={() => this.toggleHeart()} />
            }
            position={'right center'} />
        </p>
        <p style={{ fontStyle: `italic` }}>{singleWine.description}</p>
      </div>
    )
  }
}

export default SingleWineDetails
