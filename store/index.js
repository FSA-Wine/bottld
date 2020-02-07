import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { singleWineReducer as singleWine } from './singleWine'
import { winesReducer as wines } from './wines'
import recommended from './recommended'
import user from './user'

const reducer = combineReducers({
  singleWine,
  wines,
  user,
  recommended,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
export default () => {
  return createStore(reducer, middleware)
}
