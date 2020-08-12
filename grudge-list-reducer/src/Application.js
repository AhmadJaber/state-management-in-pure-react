import React, { useReducer } from 'react';
import { v4 as id } from 'uuid';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import initialState from './initialState';
import { useCallback } from 'react';

const ADD_GRUDGE = 'ADD_GRUDGE';
const FORGIVE_GRUDGE = 'FORGIVE_GRUDGE';

const reducer = (state, action) => {
  if (action.type === ADD_GRUDGE) {
    return [...state, action.payload];
  }

  if (action.type === FORGIVE_GRUDGE) {
    return state.map((grudge) => {
      if (grudge.id !== action.payload.id) return grudge;
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
        type: ADD_GRUDGE,
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
        type: FORGIVE_GRUDGE,
        payload: {
          id
        }
      });
    },
    [dispatch]
  );

  console.log('app');

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
