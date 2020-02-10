import React from 'react'
import Link from 'next/link'
import { Grid, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout } from '../store/user'

const Nav = props => (
  <Grid style={{ margin: `10px 20px` }} stackable columns={2}>
    <Grid.Column width={2}>
      <Link href="/">
        <a>
          <Image src="/bottld-logo-2.svg" style={{ cursor: 'pointer' }}></Image>
        </a>
      </Link>
    </Grid.Column>
    <Grid.Column width={14}>
      {props.isLoggedIn ? (
        <Grid columns={2}>
          <Grid.Column width={14} textAlign="right">
            <Link href="/user">
              <a>MY PROFILE</a>
            </Link>
          </Grid.Column>
          <Grid.Column width={2} textAlign="right">
            <a href="#" onClick={() => props.logout()}>
              LOGOUT
            </a>
          </Grid.Column>
        </Grid>
      ) : (
        <Grid>
          <Grid.Column textAlign="right">
            <a href="/auth/google">LOGIN</a>
          </Grid.Column>
        </Grid>
      )}
    </Grid.Column>
  </Grid>
)

const mapState = state => ({
  isLoggedIn: state.user.googleId,
})

const mapDispatch = {
  logout,
}

export default connect(mapState, mapDispatch)(Nav)
