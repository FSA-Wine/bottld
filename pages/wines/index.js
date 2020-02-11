import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import {
  Button,
  Dropdown,
  Image,
  Popup,
  Card,
  List,
  Segment,
  Input,
  Label,
} from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { fetchWines } from '../../store/wines'
import Paginate from '../../components/Paginate'
import Layout from '../../components/Layout'
import AllWineList from '../../components/AllWineList'
import ErrorNoResults from '../../components/ErrorNoResults'

const countryOptions = [
  { key: 'Argentina', text: 'Argentina', value: 'Argentina' },
  { key: 'Italy', text: 'Italy', value: 'Italy' },
  { key: 'Spain', text: 'Spain', value: 'Spain' },
  { key: 'US', text: 'US', value: 'US' },
]

const colorOptions = [
  { key: 'red', text: 'Reds', value: 'red' },
  { key: 'white', text: 'Whites', value: 'white' },
  { key: 'rose', text: 'Rose', value: 'rose' },
]

const varietyOptions = [
  { key: 'Cabernet', text: 'Cabernet', value: 'Cabernet' },
  { key: 'Cabernet Sauvignon', text: 'Cabernet Sauvignon', value: 'Cabernet Sauvignon' },
  { key: 'Malbec', text: 'Malbec', value: 'Malbec' },
  { key: 'Pinot Noir', text: 'Pinot Noir', value: 'Pinot Noir' },
  { key: 'Nebbiolo', text: 'Nebbiolo', value: 'Nebbiolo' },
]

const maxPriceOptions = [
  { key: '2000', text: 'Less than $2000', value: '1999' },
  { key: '1000', text: 'Less than $1000', value: '999' },
  { key: '500', text: 'Less than $500', value: '499' },
  { key: '250', text: 'Less than $250', value: '249' },
  { key: '100', text: 'Less than $100', value: '99' },
  { key: '75', text: 'Less than $75', value: '74' },
  { key: '50', text: 'Less than $50', value: '49' },
  { key: '25', text: 'Less than $25', value: '24' },
]

const minPriceOptions = [
  { key: '25', text: 'Greater than $25', value: '25' },
  { key: '50', text: 'Greater than $50', value: '50' },
  { key: '75', text: 'Greater than $75', value: '75' },
  { key: '100', text: 'Greater than $100', value: '100' },
  { key: '250', text: 'Greater than $250', value: '250' },
  { key: '500', text: 'Greater than $500', value: '500' },
  { key: '1000', text: 'Greater than $1000', value: '1000' },
  { key: '2000', text: 'Greater than $2000', value: '2000' },
]

const Wines = props => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [color, setColor] = useState('')
  const [country, setCountry] = useState('')
  const [variety, setVariety] = useState('')
  const [priceLow, setPriceLow] = useState(0)
  const [priceHigh, setPriceHigh] = useState(99999)
  const [view, setView] = useState('likedWines')

  const router = useRouter()

  useEffect(() => {
    props.fetchWines(page, limit, {
      value: router.query.search,
      color,
      country,
      variety,
      priceHigh,
      priceLow,
    })
  }, [page, limit, router.query.search, color, country, variety, priceHigh, priceLow])
  return (
    <Layout>
      <div>
        {/* <Head>
          <title>Search Wines</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <div>
          <Dropdown
            placeholder="Select Country"
            clearable
            options={countryOptions}
            search
            selection
            onChange={(e, { value }) => setCountry(value)}
          />
          <Dropdown
            placeholder="Select Type"
            clearable
            options={colorOptions}
            selection
            disabled={variety === '' ? false : true}
            onChange={(e, { value }) => setColor(value)}
          />
          <Dropdown
            placeholder="Select Variety"
            clearable
            search
            selection
            disabled={color === '' ? false : true}
            options={varietyOptions}
            onChange={(e, { value }) => setVariety(value)}
          />
          <Dropdown
            clearable
            selection
            placeholder="Set Min Price"
            options={minPriceOptions}
            onChange={(e, { value }) => setPriceLow(Number(value))}
          />
          <Dropdown
            selection
            placeholder="Set Max Price"
            options={maxPriceOptions}
            onChange={(e, { value }) => setPriceHigh(Number(value))}
          />
        </div>
        {props.wines.length ? (
          <Segment attached="bottom">
            <AllWineList wines={props.wines} view={view} />
          </Segment>
        ) : (
          <section style={{ margin: `0 auto`, paddingTop: `12vh` }}>
            <ErrorNoResults />
          </section>
        )}
        <Paginate limit={limit} count={props.wineCount} setPage={newPage => setPage(newPage)} />
      </div>
    </Layout>
  )
}

const mapState = state => ({
  wines: state.wines.data,
  wineCount: state.wines.count,
  user: state.user,
  isLoggedIn: state.user.googleId,
})

const mapDispatch = {
  fetchWines,
}

export default connect(mapState, mapDispatch)(Wines)
