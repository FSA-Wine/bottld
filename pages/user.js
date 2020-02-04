import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'

const User = props => {
  return (
    <Layout>
      <section>
        <section className="wines">
          <h2>Cheers, {props.user.firstName}</h2>
          <button>Tried</button>
          <span>
            <button>Liked</button>
          </span>
          <ul>
            {!props.user.liked ? (
              <li>Nothing!</li>
            ) : (
              props.user.liked.map(wineId => (
                <Link href={`/wines/${wineId}`} key={wineId}>
                  <a className="card">
                    {/* Need to grab the wine data and populate the li properly*/}
                    <li>{wineId}</li>
                  </a>
                </Link>
              ))
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
