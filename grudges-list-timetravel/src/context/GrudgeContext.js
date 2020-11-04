import React, { createContext, useCallback } from 'react';
import { v4 as id } from 'uuid';
import initialState from '../initialState';
import { useUndoReducer } from '../hooks/useUndoReducer';
import {
  ADD_GRUDGES,
  TOGGLE_FORGIVENESS,
  UNDO,
  REDOO
} from '../constants/constants';

export const GrudgeContext = createContext();

const reducer = (state, action) => {
  if (action.type === ADD_GRUDGES) {
    return [action.payload, ...state.present];
  }

  if (action.type === TOGGLE_FORGIVENESS) {
    console.log(state);
    return state.present.map((grudge) => {
      if (grudge.id === action.payload.id) {
        return { ...grudge, forgiven: !grudge.forgiven };
      }

      return grudge;
    });
  }

  return state;
};

export function GrudgeProvider({ children }) {
  const [state, dispatch] = useUndoReducer(reducer, initialState);
  const grudges = state.present;
  const havePast = !!state.past.length;
  const haveFuture = !!state.future.length;
  console.log('state', state);

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

  const redoo = useCallback(() => {
    dispatch({ type: REDOO });
  }, [dispatch]);

  const value = {
    grudges,
    toggleForgiveness,
    addGrudge,
    undo,
    havePast,
    haveFuture,
    redoo
  };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
}

/*
 * Timetravel process -
 - first put the state.present to state.past
 - when undo happens, put the state.past to state.present & sate.present to state.future
 - if we change something in past, there will be new future which is emply-array
 */
