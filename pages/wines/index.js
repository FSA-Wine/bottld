import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchWines } from '../../store/wines'
import Paginate from '../../components/Paginate'
import Layout from '../../components/Layout'

const Wines = props => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)

  const router = useRouter()

  useEffect(() => {
    props.fetchWines(page, limit, router.query.search)
  }, [page, limit, router.query.search])

  console.log('props?', router.query)
  return (
    <Layout>
      <div>
        {/* <Head>
          <title>Search Wines</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <ul>
          {props.wines.length ? (
            props.wines.map(wine => (
              <Link
                href="/wines/[id]"
                as={`/wines/${wine._fields[0].properties.id.low}`}
                key={wine._fields[0].properties.id.low}>
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

// Wines.getInitialProps = async ctx => {
//   const { url } = ctx.pathname
//   return { url}
// }

const mapState = state => ({
  wines: state.wines.data,
  wineCount: state.wines.count,
})

const mapDispatch = {
  fetchWines,
}

export default connect(mapState, mapDispatch)(Wines)
