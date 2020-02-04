import React from 'react'
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
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        {props.isLoggedIn ? (
          <a href="#" onClick={() => props.logout()}>
            Logout
          </a>
        ) : (
          <a href="/auth/google">Login with Google</a>
        )}
      </li>
      {/* {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))} */}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

const mapState = state => ({
  isLoggedIn: state.user.googleId,
})

const mapDispatch = {
  logout,
}

export default connect(mapState, mapDispatch)(Nav)
