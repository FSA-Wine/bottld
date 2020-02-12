import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { Button, Grid, Input } from 'semantic-ui-react'
import Layout from '../components/Layout'
import { logout } from '../store/user'

//sign in button hidden if logged in

const Home = props => {
  const [search, setSearch] = useState('')
  const handleChange = e => {
    setSearch(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    Router.push({
      pathname: '/wines',
      query: {
        search,
        page: 1,
        limit: 25,
        color: '',
        country: '',
        variety: '',
        priceLow: 0,
        priceHigh: 2999,
      },
    })
  }
  const handleEnter = e => {
    if (e.key === 'Enter' && search) {
      Router.push({
        pathname: '/wines',
        query: {
          search,
          page: 1,
          limit: 25,
          color: '',
          country: '',
          variety: '',
          priceLow: 0,
          priceHigh: 9999,
        },
      })
    }
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:400i|Playfair+Display:700&display=swap"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>

        <Grid id="carousel" style={{ width: `80vw`, margin: `0 auto` }} verticalAlign="middle">
          <Grid.Column id="carousel-text" doubling centered width={12}>
            <Grid.Row>
              <h1
                style={{
                  color: `#980000`,
                  fontFamily: `Playfair Display, serif`,
                  fontSize: `2.9rem`,
                }}>
                Find your perfect wine match.
              </h1>
              <h4
                style={{
                  fontStyle: `italic`,
                  letterSpacing: `.1px`,
                  fontSize: `1.5rem`,
                  fontFamily: `Lato, serif`,
                  fontWeight: `400`,
                }}>
                {`Enter the name of a wine you've enjoyed, `}
                <br />
                {`and we'll recommend
            similar wines.`}
              </h4>
            </Grid.Row>

            <Grid.Row style={{ margin: `20px` }}>
              <Input
                type="text"
                icon="search"
                name="search"
                value={search}
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
            </Grid.Row>
            {/* This section should display only if user is not logged in. After login, this section flashes before disappearing */}
            <Grid.Row>
              {!props.isLoggedIn ? (
                <h4>
                  <Button
                    type="button"
                    style={{
                      margin: `5px`,
                      border: `2px solid #980000`,
                      color: `#980000`,
                      backgroundColor: 'white',
                    }}>
                    <a href="/auth/google" style={{ color: `#980000` }}>
                      LOG IN
                    </a>
                  </Button>{' '}
                  <span style={{ fontWeight: `400` }}>for personalized recommendations</span>
                </h4>
              ) : (
                <div></div>
              )}
            </Grid.Row>
          </Grid.Column>
          <Grid.Row style={{ height: `80vh` }}>
            <Grid.Column only="tablet computer" width={5} floated="right">
              <img
                alt="wine illustration"
                src="/bottles-outline-glass-rev.svg"
                style={{
                  opacity: `60%`,
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  )
}

const mapState = state => ({
  isLoggedIn: state.user.googleId,
})

const mapDispatch = {
  logout,
}

export default connect(mapState, mapDispatch)(Home)
