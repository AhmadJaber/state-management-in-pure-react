import React, { useReducer, createContext } from 'react';
import { v4 as id } from 'uuid';
// import { defaultGrudges } from './initialstateobject';

export const GrudgeObjectContext = createContext();

const ADD_GRUDGES = 'ADD_GRUDGES';
const TOGGLE_FORGIVENESS = 'TOGGLE_FORGIVENESS';

const reducer = (state, action) => {
  if (action.type === ADD_GRUDGES) {
    return { [action.payload.id]: action.payload, ...state };
  }

  if (action.type === TOGGLE_FORGIVENESS) {
    const grudges = { ...state };
    const grudge = state[action.payload.id];
    grudge.forgiven = !grudge.forgiven;

    return grudges;
  }

  return state;
};

export function GrudgeObjectProvider({ children }) {
  const [grudges, dispatch] = useReducer(reducer, {});

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
  const value = {
    grudges: Object.values(grudges),
    toggleForgiveness,
    addGrudge
  };

  return (
    <GrudgeObjectContext.Provider value={value}>
      {children}
    </GrudgeObjectContext.Provider>
  );
}
