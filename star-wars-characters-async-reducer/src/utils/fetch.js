import { ERROR, FETCHING_COMPLETED, LOADING } from '../constants/constants';
import { URL } from '../endpoint';

export const fetchCharacters = (dispatch) => {
  dispatch({ type: LOADING });

  fetch(URL + '/characters')
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: FETCHING_COMPLETED,
        payload: {
          characters: data.results,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    });
};
