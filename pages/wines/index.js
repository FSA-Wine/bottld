import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Dropdown, Segment, Grid, Input, Button } from 'semantic-ui-react'
import Router, { useRouter } from 'next/router'
import { fetchWines } from '../../store/wines'
import Paginate from '../../components/Paginate'
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
  const [currentSearch, setCurentSearch] = useState(router.query.search)
  const [page, setPage] = useState(1)
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
  
  const handleChange = e => {
    setCurentSearch(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    setSearch(currentSearch)
    Router.push({
      pathname: '/wines',
      as: `/wines?search=${currentSearch}`,
      query: { search },
    })
  }
  const handleEnter = e => {
    if (e.key === 'Enter' && search) {
      setSearch(currentSearch)
      Router.push({
        pathname: '/wines',
        as: `/wines?search=${currentSearch}`,
        query: { search },
      })
    }
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
          />
        </Head>
        {/* <Grid.Row style={{ margin: `20px` }}>
          <Input
            type="text"
            name="search"
            value={search}
            // onChange={(e, { value }) => setSearch(value)}
            icon="search"
            onChange={handleChange}
            onKeyPress={handleEnter}
            placeholder="Enter a wine name"
          />
          <Button
                type="submit"
                style={{ margin: `10px`, backgroundColor: `#b7b7b7ff` }}
                disabled={!search}
                onClick={handleSubmit}>
                Submit
              </Button>
        </Grid.Row> */}
        <Grid.Row columns={5} style={{ margin: `0 0 0 10px` }}>
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
          <Input
            type="text"
            name="search"
            value={currentSearch}
            icon="search"
            onChange={handleChange}
            onKeyPress={handleEnter}
            placeholder="Enter a wine name"
          />
          <Button
            type="submit"
            style={{ margin: `0 0 0 10px`, backgroundColor: `#b7b7b7ff`}}
            disabled={!currentSearch}
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
