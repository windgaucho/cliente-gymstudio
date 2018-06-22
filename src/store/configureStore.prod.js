import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {
  const store = createStore(
    combineReducers({
    }),
    applyMiddleware(thunk));

  return store;
}
