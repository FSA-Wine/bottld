import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'

const User = props => {
  const [view, setView] = useState('likedWines')
  return (
    <Layout>
      <section>
        <section className="wines">
          <h2>Cheers, {props.user.firstName}!</h2>
          <button onClick={() => setView('triedWines')}>Tried</button>
          <span>
            <button onClick={() => setView('likedWines')}>Liked</button>
          </span>
          <ul>
            {!props.user[view] ? (
              <li>Nothing!</li>
            ) : (
              props.user[view].map(wine => {
                const wineProps = wine._fields[0].properties
                return (
                  <Link href={`/wines/${wineProps.id}`} key={wineProps.id}>
                    <a className="card">
                      {/* Need to grab the wine data and populate the li properly*/}
                      <li>{wineProps}</li>
                    </a>
                  </Link>
                )
              })
            )}
          </ul>
        </section>
        <section className="data">
          <div></div>
        </section>
      </section>
    </Layout>
  )
}

const mapState = state => ({
  user: state.user,
})

export default connect(mapState)(User)
