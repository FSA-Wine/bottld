import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
//import Link from 'next/link'
import { Button, Dropdown, Grid, Input, Label } from 'semantic-ui-react'
import {
  flavors,
  countryOptions,
  varietyOptions,
  colorOptions,
  maxPriceOptions,
  minPriceOptions,
} from './dropdownOptions'
import { fetchRecWines } from '../store/recommended'

const SearchRow = props => {
  const [limit, setLimit] = useState(5)
  const [vintage, setVintage] = useState('')
  const [color, setColor] = useState('')
  const [country, setCountry] = useState('')
  const [variety, setVariety] = useState('')
  const [priceLow, setPriceLow] = useState(0)
  const [priceHigh, setPriceHigh] = useState(99999)

  useEffect(() => {
    props.fetchRecWines({
      limit,
      vintage,
      color,
      country,
      variety,
      priceHigh,
      priceLow,
    })
  }, [limit, color, vintage, country, variety, priceHigh, priceLow])

  return (
    <div>
      <Grid>
        <hr style={{ borderTop: `2px solid #BEBEBE`, width: `100%` }} />
        <Grid.Row>
          <div>
            <h3 style={{ fontStyle: `italic` }}>Make some selections to find your next match:</h3>
          </div>
        </Grid.Row>

        {/* Top row of inputs */}
        <Grid.Row centered columns={2} style={{ display: `flex` }}>
          <Grid.Column width={6} columns={2} style={{ display: `flex` }}>
            <h4 style={{ margin: `8px` }}> Variety</h4>
            <Dropdown
              clearable
              fluid
              search
              selection
              disabled={color === '' ? false : true}
              options={varietyOptions}
              onChange={(e, { value }) => setVariety(value)}
              placeholder="Select Variety"
            />
          </Grid.Column>

          <Grid.Column width={6} columns={2} style={{ display: `flex` }}>
            <h4 style={{ margin: `8px` }}> Country</h4>
            <Dropdown
              clearable
              fluid
              search
              selection
              options={countryOptions}
              onChange={(e, { value }) => setCountry(value)}
              placeholder="Select Country"
            />
          </Grid.Column>
        </Grid.Row>

        {/* bottom row of inputs */}
        <Grid.Row centered columns={2} style={{ display: `flex` }}>
          <Grid.Column width={6} columns={2} style={{ display: `flex` }}>
            <h4 style={{ margin: `8px` }}> Type </h4>
            <Dropdown
              clearable
              fluid
              search
              selection
              disabled={variety === '' ? false : true}
              options={colorOptions}
              onChange={(e, { value }) => setColor(value)}
              placeholder="Select Type"
            />
          </Grid.Column>

          <Grid.Column width={10} columns={3} style={{ display: `flex` }}>
            <h4 style={{ margin: `8px 0 8px 10px` }}> Price</h4>
            <Dropdown
              clearable
              selection
              style={{
                margin: `0 0 0 15px`,
                paddingTop: `.9em`,
                paddingLeft: `.3em`,
              }}
              placeholder="Set Minimum"
              options={minPriceOptions}
              onChange={(e, { value }) => setPriceLow(Number(value))}
            />
            <Dropdown
              selection
              style={{
                margin: `0 0 0 15px`,
                paddingTop: `.9em`,
                paddingLeft: `.3em`,
              }}
              placeholder="Set Max"
              options={maxPriceOptions}
              onChange={(e, { value }) => setPriceHigh(Number(value))}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  isLoggedIn: state.user.googleId,
  recommended: state.recommended,
})

const mapDispatch = {
  fetchRecWines,
}

export default connect(mapState, mapDispatch)(SearchRow)
