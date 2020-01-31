import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import axios from 'axios'

import { fetchWines } from '../store/wines'

const Wines = props => {
  // const [wine, setWine] = useState('')
  // const [wines, setWines] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [search, setSearch] = useState('')

  useEffect(() => {
    props.fetchWines(page, limit, search)
  }, [page, limit, search])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    props.fetchWines(page, limit, search)
    setSearch('')
  }

  return (
    <div>
      <Head>
        <title>Search Wines</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" value={search} onChange={handleChange}></input>
        <button disabled={!search}>Submit</button>
      </form>
    </div>
  )
}

Wines.getInitialProps = async ({ store }) => {
  store.dispatch(fetchWines(page, limit, search))
}

const mapState = state => ({
  wines: state.wines.data,
  wineCount: state.wines.count,
})

const mapDispatch = {
  fetchWines,
}

export default connect(mapState, mapDispatch)(Wines)
