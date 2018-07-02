import * as types from '../constants/ActionTypes';

export const setSucursal = (idSucursal) => (
  dispatch => {
    dispatch({
      type: types.SET_SUCURSAL,
      payload: {
        idSucursal,
      },
    });
  }
);
