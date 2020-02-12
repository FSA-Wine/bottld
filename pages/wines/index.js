import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { Dropdown, Segment, Grid, Input, Button, Icon } from 'semantic-ui-react'
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
  const [page, setPage] = useState(Number(router.query.page))
  const [limit, setLimit] = useState(Number(router.query.limit) || 25)
  const [color, setColor] = useState(router.query.color || '')
  const [country, setCountry] = useState(router.query.country || '')
  const [variety, setVariety] = useState(router.query.variety || '')
  const [priceLow, setPriceLow] = useState(Number(router.query.priceLow) || '')
  const [priceHigh, setPriceHigh] = useState(Number(router.query.priceHigh) || '')

  const fetchAction = searchStr => {
    return props.fetchWines(page, limit, {
      value: searchStr,
      color,
      country,
      variety,
      priceHigh,
      priceLow,
    })
  }
  useEffect(() => {
    fetchAction(router.query.search)
    handleRoute(router.query.search)
  }, [page, limit, color, country, variety, priceHigh, priceLow])

  const handleChange = e => {
    setSearch(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    setPage(1)
    handleRoute(search)
    fetchAction(search)
  }
  const handleEnter = e => {
    if (e.key === 'Enter' && search) {
      setPage(1)
      handleRoute(search)
      fetchAction(search)
    }
  }

  const handleRoute = searchStr => {
    Router.push({
      pathname: '/wines',
      query: {
        search: searchStr,
        page,
        limit,
        color,
        country,
        variety,
        priceLow,
        priceHigh,
      },
    })
  }

  const pageChange = val => {
    setPage(val + Number(page))
    // handleRoute()
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Wine results for '{search}'</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
            href="https://fonts.googleapis.com/css?family=Lato:400i|700i&display=swap"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>
        <Grid.Row columns={5} style={{ margin: `0 0 0 10px` }}>
          <Dropdown
            placeholder="Select Country"
            clearable
            defaultValue={country}
            options={countryOptions}
            search
            selection
            onChange={(e, { value }) => setCountry(value)}
          />
          <Dropdown
            placeholder="Select Type"
            clearable
            defaultValue={color}
            options={colorOptions}
            selection
            disabled={variety === '' ? false : true}
            onChange={(e, { value }) => setColor(value)}
          />
          <Dropdown
            placeholder="Select Variety"
            defaultValue={variety}
            clearable
            search
            selection
            disabled={color === '' ? false : true}
            options={varietyOptions}
            onChange={(e, { value }) => setVariety(value)}
          />
          <Dropdown
            defaultValue={priceLow}
            clearable
            selection
            placeholder="Set Min Price"
            options={minPriceOptions}
            onChange={(e, { value }) => setPriceLow(value)}
          />
          <Dropdown
            selection
            clearable
            defaultValue={priceHigh}
            placeholder="Set Max Price"
            options={maxPriceOptions}
            onChange={(e, { value }) => setPriceHigh(value)}
          />
          <Input
            type="text"
            name="search"
            value={search}
            icon="search"
            onChange={handleChange}
            onKeyPress={handleEnter}
            placeholder="Enter a wine name"
          />
          <Button
            type="submit"
            style={{ margin: `0 0 0 10px`, backgroundColor: `#b7b7b7ff` }}
            disabled={!search}
            onClick={handleSubmit}>
            Submit
          </Button>
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
          <Button animated onClick={() => pageChange(-1)} disabled={page <= 1}>
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
