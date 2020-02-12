import axios from 'axios'

const GET_RECOMMENDED = 'GET_RECOMMENDED'

export const setRecWines = wines => ({
  type: GET_RECOMMENDED,
  wines,
})

export const fetchRecWines = search => async dispatch => {
  try {
    const { data } = await axios.get(
      `/api/wines/recommended?color=${search.color}&country=${search.country}&variety=${search.variety}&priceLow=${search.priceLow}&priceHigh=${search.priceHigh}&limit=${search.limit}`
    )
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
