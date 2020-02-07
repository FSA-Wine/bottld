import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_LIKED_WINES = 'GET_LIKED_WINES'
const GET_TRIED_WINES = 'GET_TRIED_WINES'
const LIKE_WINE = 'LIKE_WINE'
const UNLIKE_WINE = 'UNLIKE WINE'
const TRY_WINE = 'TRY_WINE'
const UNTRY_WINE = 'UNTRY_WINE'

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
const addLikedWine = wine => ({ type: LIKE_WINE, wine })
// const likeWine = wine => ({type: LIKE_WINE, wine})
// const unlikeWine = wine => ({type: UNLIKE_WINE, wine})
// const likeWine = wine => ({type: LIKE_WINE, wine})
// const likeWine = wine => ({type: LIKE_WINE, wine})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    const [liked, tried] = await Promise.all([
      axios.get(`/api/wines/liked?googleId=${res.data.googleId}`),
      axios.get(`/api/wines/tried?googleId=${res.data.googleId}`),
    ])
    dispatch(getLikedWines(liked.data))
    dispatch(getTriedWines(tried.data))
  } catch (err) {
    console.error(err)
  }
}

export const likeWine = (liked, user, wine) => async dispatch => {
  try {
    if (liked) {
      const { data } = await axios.delete('/api/wines/liked', { data: { user, wine } })
      dispatch(getLikedWines(data))
    } else {
      const { data } = await axios.post('/api/wines/liked', { user, wine })
      dispatch(addLikedWine(data))
    }
  } catch (error) {
    console.error(error)
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
    case LIKE_WINE:
      return { ...state, likedWines: [...state.likedWines, action.wine] }
    default:
      return state
  }
}
