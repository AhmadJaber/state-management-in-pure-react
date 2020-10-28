import React, { useReducer, createContext } from 'react';
import { v4 as id } from 'uuid';
import initialState from '../initialState';

export const GrudgeContext = createContext();

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

export function GrudgeProvider({ children }) {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = ({ person, reason }) => {
    dispatch({
      type: ADD_GRUDGES,
      payload: {
        person,
        reason,
        id: id(),
        forgiven: false
      }
    });
  };

  const toggleForgiveness = (id) => {
    dispatch({
      type: TOGGLE_FORGIVENESS,
      payload: {
        id
      }
    });
  };
  const value = { grudges, toggleForgiveness, addGrudge };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
}
