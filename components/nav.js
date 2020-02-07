import React, { Fragment } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { logout } from '../store/user'

// const links = [
//   { href: 'https://zeit.co/now', label: 'ZEIT' },
//   { href: 'https://github.com/zeit/next.js', label: 'GitHub' },
// ].map(link => ({
//   ...link,
//   key: `nav-link-${link.href}-${link.label}`,
// }))

const Nav = props => (
  <div className="navbar">
    <div className="logo-wrapper">
      <Link href="/">
        <div>
          <img id="logo" src="/bottld-logo.svg" />
        </div>
      </Link>
    </div>
    <div className="nav-wrapper">
      <nav>
        <span className="nav-general">
          {props.isLoggedIn ? (
            <Fragment>
              <Link href="/user">
                <a>MY PROFILE</a>
              </Link>

              <a href="#" onClick={() => props.logout()}>
                LOGOUT
              </a>
            </Fragment>
          ) : (
            <a href="/auth/google">LOGIN</a>
          )}
        </span>
      </nav>
    </div>
  </div>
)

const mapState = state => ({
  isLoggedIn: state.user.googleId,
})

const mapDispatch = {
  logout,
}

export default connect(mapState, mapDispatch)(Nav)
