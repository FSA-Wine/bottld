import axios from "axios";

const GET_SINGLE_WINE = "GET_SINGLE_WINE";

export const getSingleWine = wine => {
  return {
    type: GET_SINGLE_WINE,
    wine
  };
};

export const fetchSingleWine = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/wines/${id}`);
      const action = getSingleWine(response.data);
      dispatch(action);
    } catch (err) {
      console.error(err);
    }
  };
};

export const singleWineReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SINGLE_WINE:
      return action.wine;
    default:
      return state;
  }
};
