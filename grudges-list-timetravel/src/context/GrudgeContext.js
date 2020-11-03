/*
 * Timetravel process -
 - first put the state.present to state.past
 - when undo happens, put the state.past to state.present & sate.present to state.future
 - if we do undo then, do sopmething that will create a new branch to the state.future
 */

import React, { useReducer, createContext, useCallback } from 'react';
import { v4 as id } from 'uuid';
import initialState from '../initialState';

export const GrudgeContext = createContext();

const ADD_GRUDGES = 'ADD_GRUDGES';
const TOGGLE_FORGIVENESS = 'TOGGLE_FORGIVENESS';
const UNDO = 'UNDO';
const REDOO = 'REDOO';

const reducer = (state, action) => {
  if (action.type === ADD_GRUDGES) {
    const newPresent = [action.payload, ...state.present];
    return {
      past: [...state.past, state.present],
      present: newPresent,
      future: []
    };
  }

  if (action.type === TOGGLE_FORGIVENESS) {
    const newPresent = state.present.map((grudge) => {
      if (grudge.id === action.payload.id) {
        return { ...grudge, forgiven: !grudge.forgiven };
      }

      return grudge;
    });

    return {
      past: [...state.past, state.present],
      present: newPresent,
      future: []
    };
  }

  if (action.type === UNDO) {
    const [newPresent, ...newPast] = state.past;
    console.log('newpresent', newPresent);
    console.log('newpast', newPast);

    return {
      past: newPast,
      present: newPresent,
      future: [...state.future, state.present]
    };
  }

  return state;
};

const defaultState = {
  past: [],
  present: initialState,
  future: []
};

export function GrudgeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const grudges = state.present;
  const havePast = !!state.past.length;
  const haveFuture = !!state.future.length;
  console.log('past:', state.past);

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

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, [dispatch]);

  const value = {
    grudges,
    toggleForgiveness,
    addGrudge,
    undo,
    havePast,
    haveFuture
  };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
}
