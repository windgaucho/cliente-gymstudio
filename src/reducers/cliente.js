import update from 'immutability-helper';
import * as types from '../constants/ActionTypes';
import initialState from './initialState';

const cliente = (state = initialState.cliente, action) => {
  switch (action.type) {
    case types.SET_APYN_CLIENTE: {
      return update(state, {
        apyn: { $set: action.payload.apyn },
      });
    }

    default:
      return state;
  }
};

export default cliente;
