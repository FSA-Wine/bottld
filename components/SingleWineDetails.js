import React, { Component } from 'react'
import { Image, Popup } from 'semantic-ui-react'
import { trimParen, wineColor, countryFlag, scoreComment } from './utils'

class SingleWineDetails extends Component {
  render() {
    const singleWine = this.props.singleWine
    const price = singleWine.price
      ? singleWine.price.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
      : 'Not available   '
    return (
      <div>
        <hr style={{ borderTop: `5px solid ${wineColor(singleWine.color)}` }} />
        <h2>{trimParen(singleWine.title)}</h2>
        <img
          style={{ width: `2em`, margin: `0 0 7px 0` }}
          src={countryFlag(singleWine.country)}
          circular
        />
        <p>
          <span className="sm-gray">ORIGIN:</span> {singleWine.province}, {singleWine.country}{' '}
        </p>
        <p>
          <span className="sm-gray">WINERY:</span> {singleWine.winery}
        </p>
        <p>
          <span className="sm-gray">VARIETY:</span> {singleWine.variety}
        </p>
        <p>
          <span className="sm-gray">EST. PRICE:</span> {price.slice(0, -3)}
        </p>
        <p>
          <span className="sm-gray">SCORE:</span>{' '}
          <span style={{ fontWeight: `bold` }}>{singleWine.points.low}</span> &nbsp;
          <span style={{ color: `gray` }}>{scoreComment(singleWine.points.low)}</span>
        </p>
        <p>
          <Popup
            content={
              this.props.likeWine
                ? 'You like this wine'
                : this.props.isLoggedIn
                ? 'Add to Liked Wines'
                : 'Please log in to like this wine'
            }
            trigger={
              <Image
                src={this.props.likeWine ? '/heart-solid.svg' : '/heart-outline.svg'}
                width="20px"
                onClick={() => this.props.onLike()}
              />
            }
            position={'right center'}
          />
        </p>
        <p style={{ fontStyle: `italic` }}>{singleWine.description}</p>
      </div>
    )
  }
}

export default SingleWineDetails
