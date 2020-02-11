import axios from 'axios'

const GET_WINES = 'GET_WINES'

const getWines = wines => ({ type: GET_WINES, wines })

const initialState = {
  count: null,
  data: [],
}

export const fetchWines = (page, limit = 25, search) => async dispatch => {
  try {
    const { data } = await axios.get(
      `/api/wines?page=${page}&limit=${limit}&search=${search.value}&vintage=${search.vintage}&color=${search.color}&country=${search.country}&variety=${search.variety}&priceLow=${search.priceLow}&priceHigh=${search.priceHigh}`
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
