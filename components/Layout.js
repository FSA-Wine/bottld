import React from 'react'
import Nav from './nav'

const Layout = props => (
  <div>
    <Nav />
    {props.children}
  </div>
)

export default Layout
