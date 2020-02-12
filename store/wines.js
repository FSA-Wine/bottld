import axios from 'axios'

const GET_WINES = 'GET_WINES'

const getWines = wines => ({ type: GET_WINES, wines })

const initialState = []

export const fetchWines = (page, limit = 25, search) => async dispatch => {
  try {
    const { data } = await axios.get(
      `/api/wines?page=${page}&limit=${limit}&search=${search.value}&color=${
        search.color
      }&country=${search.country}&variety=${search.variety}&priceLow=${search.priceLow ||
        0}&priceHigh=${search.priceHigh || 9999}`
    )
    dispatch(getWines(data))
  } catch (error) {
    console.error(error)
  }
}

export const winesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WINES:
      return action.wines
    default:
      return state
  }
}
