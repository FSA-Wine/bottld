import React, { useState } from 'react'
import Head from 'next/head'

export default () => {
  const [wine, setWine] = useState('')

  const handleChange = e => {
    setWine(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    //DO SOMETHING HERE
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
