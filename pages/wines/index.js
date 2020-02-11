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
  { key: 'Arabic', text: 'Arabic', value: 'Arabic' },
  { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
  { key: 'Danish', text: 'Danish', value: 'Danish' },
  { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
]

const flavorOptions = [
  { key: 'Aromic', text: 'Aromic', value: 'Aromic' },
  { key: 'Body', text: 'Body', value: 'Body' },
  { key: 'Danish', text: 'Danish', value: 'Danish' },
  { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
]

const varietyOptions = [
  { key: 'Cab', text: 'Cab', value: 'Cab' },
  { key: 'Merlot', text: 'Merlot', value: 'Merlot' },
  { key: 'Danish', text: 'Danish', value: 'Danish' },
  { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
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
          <Dropdown placeholder="Select Variety" search selection options={varietyOptions} />
          <Dropdown placeholder="Select Country" options={countryOptions} search selection />
          <Dropdown placeholder="Select Flavor" options={flavorOptions} search selection />
          <Input labelPosition="right" type="text" placeholder="Max Price">
            <Label basic>$</Label>
            <input />
            <Label>.00</Label>
          </Input>
          <Input labelPosition="right" type="text" placeholder="Min Price">
            <Label basic>$</Label>
            <input />
            <Label>.00</Label>
          </Input>
          <Button type="submit">Filter Search</Button>
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
