import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_LIKED_WINES = 'GET_LIKED_WINES'
const GET_TRIED_WINES = 'GET_TRIED_WINES'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const getLikedWines = wines => ({ type: GET_LIKED_WINES, wines })
const getTriedWines = wines => ({ type: GET_TRIED_WINES, wines })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    const liked = await axios.get(`/api/wines/liked?googleId=${res.data.googleId}`)
    const tried = await axios.get(`/api/wines/tried?googleId=${res.data.googleId}`)
    dispatch(getLikedWines(liked.data))
    dispatch(getTriedWines(tried.data))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, ...action.user }
    case REMOVE_USER:
      return defaultUser
    case GET_LIKED_WINES:
      return { ...state, likedWines: action.wines }
    case GET_TRIED_WINES:
      return { ...state, triedWines: action.wines }
    default:
      return state
  }
}
