import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Grid, Input, Segment } from 'semantic-ui-react'
import Layout from '../components/Layout'

//sign in button hidden if logged in

const Home = () => (
  <Layout>
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid id="carousel">
        <Grid.Column id="carousel-text">
          <Grid.Row>
            <h1 style={{ color: `#980000` }}>Find your perfect wine match.</h1>
            <h4 style={{ fontStyle: `italic`, letterSpacing: `.1px` }}>
              {`Enter the name of a wine you've enjoyed, and we'll recommend similar wines.`}
            </h4>
          </Grid.Row>
          <Segment>
            <Grid.Row style={{ margin: `20px` }}>
              <Input icon="search" placeholder="Type a wine name" />
              <Button type="submit" style={{ margin: `10px` }}>
                Submit
              </Button>
            </Grid.Row>
          </Segment>

          <Grid.Row>
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
                  SIGN IN
                </a>
              </Button>{' '}
              for personalized recommendations
            </h4>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  </Layout>
)

export default connect()(Home)
