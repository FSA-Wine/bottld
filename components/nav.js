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
    <Grid.Column width={14} floated="right">
      {props.isLoggedIn ? (
        <Grid columns={3}>
          <Grid.Column textAlign="right" width={12}>
            <Link href="/wines">
              <a>SEARCH</a>
            </Link>
          </Grid.Column>

          <Grid.Column width={2} textAlign="right" style={{ paddingLeft: `12px` }}>
            <Link href="/user">
              <a>MY PROFILE</a>
            </Link>
          </Grid.Column>
          <Grid.Column width={2} textAlign="right">
            <a href="#" onClick={() => props.logout()}>
              LOG OUT
            </a>
          </Grid.Column>
        </Grid>
      ) : (
        <Grid columns={2} width={14}>
          <Grid.Column textAlign="right" width={14}>
            <Link href="/wines">
              <a>SEARCH</a>
            </Link>
          </Grid.Column>
          <Grid.Column textAlign="right" width={2}>
            <a href="/auth/google">LOG IN</a>
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
