import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'

import { fetchWines } from '../store/wines'
import Paginate from '../components/Paginate'
import Layout from '../components/Layout'

const Wines = props => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [search, setSearch] = useState('')

  useEffect(() => {
    props.fetchWines(page, limit, search)
  }, [page, limit, search])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  return (
    <Layout>
      <div>
        {/* <Head>
          <title>Search Wines</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="Search wines"></input>
        <ul>
          {props.wines.length ? (
            props.wines.map(wine => (
              <Link
                href={`/wines/${wine._fields[0].properties.id}`}
                key={wine._fields[0].properties.id}>
                <a className="card">
                  <li>{wine._fields[0].properties.title}</li>
                </a>
              </Link>
            ))
          ) : (
            <li>Loading wines...</li>
          )}
        </ul>
        <Paginate limit={limit} count={props.wineCount} setPage={newPage => setPage(newPage)} />
      </div>
    </Layout>
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
