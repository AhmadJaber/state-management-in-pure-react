import { useReducer, useEffect } from 'react';

const LOADING = 'LOADING';
const FETCHING_COMPLETED = 'FETCHING_COMPLETED';
const ERROR = 'ERROR';

const initialState = {
  response: null,
  loading: true,
  error: null,
};

const FetchReducer = (state, action) => {
  if (action.type === LOADING) {
    return {
      response: null,
      loading: true,
      error: null,
    };
  }

  if (action.type === FETCHING_COMPLETED) {
    return {
      response: action.payload.data,
      loading: false,
      error: null,
    };
  }

  if (action.type === ERROR) {
    console.log(action.payload.error);
    return {
      response: null,
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

export const useFetchWithReducer = (url) => {
  const [state, dispatch] = useReducer(FetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOADING });

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: FETCHING_COMPLETED,
          payload: {
            data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: { error },
        });
      });
  }, [url]);

  return [state.response, state.loading, state.error];
};
