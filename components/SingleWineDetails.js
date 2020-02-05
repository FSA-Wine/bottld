import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import { trimParen, wineColor } from './utils'
//import { render } from '@testing-library/react';


class SingleWineDetails extends Component {
    constructor() {
        super()
        this.state = {
            likeWine: false
        }
    }

    scoreComment = (score) => {
        switch (score) {
            case (score > 80 && score < 83):
                return 'Acceptable'
                break;
            case (score < 87):
                return 'Good'
                break;
            case (score < 90):
                return 'Very good'
                break;
            case (score < 94):
                return 'Excellent'
                break;
            case (score < 98):
                return 'Superb'
                break;
            case (score < 100):
                return 'Classic'
                break;
            default:
                return ''
        }
    }

    //fills heart if clicked
    // toggleHeart = () => {
    //     const fillHeart = !(this.state.likeWine);
    //     this.setState({ fillHeart });
    //     this.state.likeWine ? (<Icon name='heart' />) : (<Icon name='heart outline' />)
    // }

    render() {
        const singleWine = this.props.singleWine;
        //let curWine = singleWine[0][0]._fields[0].properties;
        const price = singleWine.price ? `${singleWine.price}` : "Not available";
        return (
            <div>
                <hr style={{ borderTop: `5px solid gray` }} />
                {/* <hr style={{ borderTop: `5px solid ${wineColor(singleWine[0].color)}` }} /> */}
                <h2>{trimParen(singleWine.title)}</h2>
                <p><span className='sm-gray'>WINERY:</span> {singleWine.winery}</p>
                <p><span className='sm-gray'>VARIETY:</span> {singleWine.variety}</p>
                <p><span className='sm-gray'>ORIGIN:</span> {singleWine.province}, {singleWine.country}</p>
                <p><span className='sm-gray'>EST. PRICE:</span> {price}</p>
                <p><span className='sm-gray'>SCORE:</span> <span style={{ fontWeight: `bold` }}>{singleWine.points.low}</span> &nbsp;<span style={{ color: `gray` }}>Excellent</span></p>
                <p><Icon name='home' style={{ color: '#a61c00' }} /></p>
                <p style={{ fontStyle: `italic` }}>{singleWine.description}</p>
            </div >
        )
    }
}

export default SingleWineDetails;