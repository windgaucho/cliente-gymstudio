import update from 'immutability-helper';
import * as types from '../constants/ActionTypes';
import initialState from './initialState';

const sucursal = (state = initialState.idSucursal, action) => {
  switch (action.type) {
    case types.SET_SUCURSAL: {
      return update(state, { $set: action.payload.idSucursal });
    }

    default:
      return state;
  }
};

export default sucursal;
