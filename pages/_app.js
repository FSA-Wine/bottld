import React, { useEffect } from 'react'
import { Provider, connect } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import 'semantic-ui-css/semantic.min.css'
import store from '../store'
import '../styles/App.css'
import { me } from '../store/user'

const App = props => {
  const { Component, pageProps, store } = props
  useEffect(() => {
    props.me()
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const mapState = state => ({
  user: state.user,
})

const mapDispatch = {
  me,
}

export default withRedux(store)(connect(mapState, mapDispatch)(App))
