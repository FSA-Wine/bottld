import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

export default () => {
  const [wine, setWine] = useState('')
  const [wines, setWines] = useState([])

  const handleChange = e => {
    setWine(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    //DO SOMETHING HERE
    const { data } = await axios.get('/api')
    setWines(data)
    console.log(wines, 'wines')

    setWine('')
  }

  return (
    <div>
      <Head>
        <title>Search Wines</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" value={wine} onChange={handleChange}></input>
        <button disabled={!wine}>Submit</button>
      </form>
    </div>
  )
}
