import { combineReducers } from 'redux';

import cliente from './cliente';
import sucursal from './sucursal';

const rootReducer = () => {
  combineReducers({
    cliente,
    sucursal,
  });
};

export default rootReducer;
