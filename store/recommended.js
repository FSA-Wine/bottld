import axios from 'axios'

const GET_RECOMMENDED = 'GET_RECOMMENDED'

export const setRecWines = wines => ({
  type: GET_RECOMMENDED,
  wines,
})

export const fetchRecWines = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/wines/recommended`)
    dispatch(setRecWines(data))
  } catch (error) {
    console.error(error)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_RECOMMENDED:
      return action.wines
    default:
      return state
  }
}
