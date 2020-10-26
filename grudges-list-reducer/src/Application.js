import React, { useCallback, useReducer } from 'react';
import { v4 as id } from 'uuid';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import initialState from './initialState';

const ADD_GRUDGES = 'ADD_GRUDGES';
const TOGGLE_FORGIVENESS = 'TOGGLE_FORGIVENESS';

const reducer = (state, action) => {
  if (action.type === ADD_GRUDGES) {
    return [action.payload, ...state];
  }

  if (action.type === TOGGLE_FORGIVENESS) {
    return state.map((grudge) => {
      if (grudge.id !== action.payload.id) {
        return grudge;
      }

      return { ...grudge, forgiven: !grudge.forgiven };
    });
  }

  return state;
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: ADD_GRUDGES,
        payload: {
          person,
          reason,
          id: id(),
          forgiven: false
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    (id) => {
      dispatch({
        type: TOGGLE_FORGIVENESS,
        payload: {
          id
        }
      });
    },
    [dispatch]
  );

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
