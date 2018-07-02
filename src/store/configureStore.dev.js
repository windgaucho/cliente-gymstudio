import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// Este modulo verifica que el store sea inmutable
// EN PRODUCCION no tendria que estar.
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import cliente from '../reducers/cliente';
import sucursal from '../reducers/sucursal';

export default function configureStore() {
  const store = createStore(
    combineReducers({
      cliente,
      sucursal,
    }),
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
