import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
// import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = () => (
  // <div className="ui middle aligned center aligned grid">
  //   <div className="large five wide column">
  <div className="ui message">
    <a href="/auth/google">Login with Google</a>
  </div>
  //   </div>
  // </div>
)

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    userId: state.user.id,
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, userId) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.name === 'signup' ? evt.target.firstName.value : ''
      const lastName = evt.target.name === 'signup' ? evt.target.lastName.value : ''
      dispatch(auth(firstName, lastName, email, password, userId, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
