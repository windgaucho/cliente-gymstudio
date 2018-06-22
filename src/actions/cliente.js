import * as types from '../constants/ActionTypes';

export const setApynCliente = (apyn) => (dispatch) => {
  dispatch({
    type: types.SET_APYN_CLIENTE,
    payload: {
      apyn,
    },
  });
};
