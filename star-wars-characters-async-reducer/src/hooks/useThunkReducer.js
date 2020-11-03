import { useCallback, useReducer } from 'react';
import { isFunction } from 'lodash';

export const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const inhancedDispatch = useCallback(
    (action) => {
      console.log(action);

      if (isFunction(action)) {
        console.log('It is a thunk');
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch],
  );

  return [state, inhancedDispatch];
};
