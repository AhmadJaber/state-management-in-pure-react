import React, { createContext, useReducer, useCallback } from 'react';
import { v4 as id } from 'uuid';

import initialState from '../initialState';

export const GrudgeContext = createContext();

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

export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = ({ person, reason }) => {
    dispatch({
      type: ADD_GRUDGE,
      payload: {
        person,
        reason,
        id: id(),
        forgiven: false,
      },
    });
  };

  const toggleForgiveness = (id) => {
    dispatch({
      type: FORGIVE_GRUDGE,
      payload: {
        id,
      },
    });
  };

  const value = { grudges, addGrudge, toggleForgiveness };
  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};
