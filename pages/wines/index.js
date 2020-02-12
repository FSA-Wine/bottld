import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Dropdown, Segment, Grid, Input, Button, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { fetchWines } from '../../store/wines'
import Layout from '../../components/Layout'
import AllWineList from '../../components/AllWineList'
import {
  countryOptions,
  varietyOptions,
  colorOptions,
  maxPriceOptions,
  minPriceOptions,
} from '../../components/dropdownOptions'
import ErrorNoResults from '../../components/ErrorNoResults'

const Wines = props => {
  const router = useRouter()
  const [search, setSearch] = useState(router.query.search)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(25)
  const [color, setColor] = useState('')
  const [country, setCountry] = useState('')
  const [variety, setVariety] = useState('')
  const [priceLow, setPriceLow] = useState(0)
  const [priceHigh, setPriceHigh] = useState(99999)
  const [view, setView] = useState('likedWines')

  useEffect(() => {
    props.fetchWines(page, limit, {
      value: search,
      color,
      country,
      variety,
      priceHigh,
      priceLow,
    })
  }, [page, limit, search, color, country, variety, priceHigh, priceLow])

  const pageChange = val => setPage(page + val)

  const handleChange = e => {
    setSearch(e.target.value)
    setPage(0)
  }

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   Router.push({
  //     pathname: '/wines',
  //     as: `/wines?search=${search}`,
  //     query: { search },
  //   })
  // }

  return (
    <Layout>
      <div>
        <Head>
          <title>Wine results for '{search}'</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:400i|700i&display=swap"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>
        <Grid.Row style={{ margin: `20px` }}>
          <Input
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
            placeholder="Enter a wine name"
          />
          {/* <Button
            type="submit"
            style={{ margin: `10px`, backgroundColor: `#b7b7b7ff` }}
            disabled={!search}
            onClick={handleSubmit}>
            Submit
          </Button> */}
        </Grid.Row>
        <Grid.Row centered columns={5} style={{ margin: `0 0 0 10px` }}>
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
        </Grid.Row>
        {props.wines.length ? (
          <Segment attached="bottom">
            <AllWineList wines={props.wines} isLoggedIn={props.isLoggedIn} />
          </Segment>
        ) : (
          <section style={{ margin: `0 auto`, paddingTop: `12vh` }}>
            <ErrorNoResults />
          </section>
        )}
        <div style={{ textAlign: 'center' }}>
          <Button animated onClick={() => pageChange(-1)} disabled={!page}>
            <Button.Content visible>Prev</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
          <Button animated onClick={() => pageChange(1)} disabled={props.wines.length < limit}>
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      </div>
    </Layout>
  )
}

Wines.defaultProps = {
  wines: [],
}

const mapState = state => ({
  wines: state.wines,
  user: state.user,
  isLoggedIn: state.user.googleId,
})

const mapDispatch = {
  fetchWines,
}

export default connect(mapState, mapDispatch)(Wines)
