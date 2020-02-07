import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'

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
  console.log('props?', props)
  return (
    <Layout>
      {props.isLoggedIn ? (
        <section>
          <section className="wines">
            <h2>Cheers, {props.user.firstName}!</h2>
            <button onClick={() => setView('likedWines')}>Liked</button>
            <span>
              <button onClick={() => setView('triedWines')}>Tried</button>
            </span>
            <ul>
              {!props.user[view] ? (
                <li>Nothing!</li>
              ) : (
                props.user[view].map(wine => {
                  const wineProps = wine._fields[0].properties
                  return (
                    <div>
                      <Link
                        href="/wines/[id]"
                        as={`/wines/${wineProps.id.low}`}
                        key={wineProps.id.low}>
                        <a className="card">
                          <li>{wineProps.title}</li>
                        </a>
                      </Link>
                    </div>
                  )
                })
              )}
            </ul>
            <div>
              {!props.user.likedWines ? (
                <div>Flavor Profile Not Available: Like some wines to get it started!</div>
              ) : (
                <div>
                  <div>
                    <DynamicGraph likedWine={props.user.likedWines} />
                  </div>
                  <div>
                    <DynamicMap likedWine={props.user.likedWines} />
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className="data">
            <div></div>
          </section>
        </section>
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
