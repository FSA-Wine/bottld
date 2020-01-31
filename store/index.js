import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { singleWineReducer as singleWine } from "./singleWine";
import { winesReducer as wines } from "./wines";

const reducer = combineReducers({
  singleWine,
  wines
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
export default () => {
  return createStore(reducer, middleware);
};
