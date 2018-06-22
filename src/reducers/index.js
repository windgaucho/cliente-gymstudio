import { combineReducers } from 'redux';

import cliente from './cliente';

const rootReducer = () => {
  combineReducers({
    cliente,
  });
};

export default rootReducer;
