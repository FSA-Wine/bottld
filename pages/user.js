import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import UserWineList from '../components/UserWineList'
import SearchRow from '../components/SearchRow'

const DynamicGraph = dynamic(() => import('../components/UserGraph'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const DynamicMap = dynamic(() => import('../components/UserMap'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const User = props => {
  const [view, setView] = useState('likedWines')

  const getGreeting = () => {
    const greetings = ['Sláinte', 'Cheers', 'Salud', 'Prost', 'Skål', 'Santé', 'Felicidades']
    const random = Math.floor(Math.random() * greetings.length)
    return greetings[random]
  }

  return (
    <Layout>
      {props.isLoggedIn ? (
        <div className="content smaller-text">
          <div className="top-section">
            <Grid style={{ margin: `35px 0 0 0` }}>
              <Grid.Row>
                <Grid.Column>
                  <hr style={{ borderTop: `5px solid #38678f` }} />
                  <h2 style={{ fontStyle: `italic` }}>
                    {getGreeting()}, {props.user.firstName}!
                  </h2>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid columns={2} style={{ margin: `0 40px 0 0` }}>
                  <Grid.Column
                    mobile={16}
                    tablet={16}
                    computer={10}
                    style={{ padding: `0 15px 0 0` }}>
                    {/* user's tried & liked wines */}
                    <Fragment>
                      <Menu attached="top" tabular>
                        <Fragment>
                          <Menu.Item
                            name="liked"
                            active={view === 'likedWines'}
                            onClick={() => setView('likedWines')}
                          />
                          <Menu.Item
                            name="tried"
                            active={view === 'triedWines'}
                            onClick={() => setView('triedWines')}
                          />
                        </Fragment>
                      </Menu>
                      {props.user[view] ? (
                        <Segment attached="bottom">
                          <UserWineList wines={props.user[view]} view={view} />
                        </Segment>
                      ) : (
                        <div>Nothing!</div>
                      )}
                    </Fragment>
                  </Grid.Column>

                  <Grid.Column
                    mobile={16}
                    tablet={16}
                    computer={6}
                    style={{
                      padding: `0 0 0 30px`,
                    }}>
                    {/* user's liked wines: flavor profile & origin location */}
                    <div className="chart-container">
                      <p className="sm-gray">FLAVOR PROFILE</p>
                      <div className="polar-container">
                        <DynamicGraph likedWine={props.user.likedWines} />
                      </div>
                    </div>

                    <div className="chart-container">
                      <p className="sm-gray">WINE MAP</p>
                      <div className="polar-container">
                        <DynamicMap likedWine={props.user.likedWines} />
                      </div>
                    </div>
                  </Grid.Column>
                </Grid>
              </Grid.Row>

              {/* <div>
                {!props.user.likedWines.length ? (
                  <div>Flavor Profile Not Available: Like some wines to get it started!</div>
                ) : (
                )}
              </div> */}
            </Grid>
            <div className="lower-section-bg">
              <div className="lower-section">
                <Grid>
                  <Grid.Row>{/* <SearchRow /> */}</Grid.Row>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section>
          <h2>Access Denied: Please log in first</h2>
        </section>
      )}
    </Layout>
  )
}

const mapState = state => ({
  user: state.user,
  isLoggedIn: state.user.googleId,
})

export default connect(mapState)(User)
