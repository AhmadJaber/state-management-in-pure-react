import { useReducer } from 'react';
import { UNDO, REDOO } from '../constants/constants';

export const useUndoReducer = (reducer, initialState) => {
  const undoState = {
    past: [],
    present: initialState,
    future: []
  };

  const undoReducer = (state, action) => {
    const newPresent = reducer(state.present, action);
    console.log('reducer:', newPresent);

    if (action.type === UNDO) {
      const [newPresent, ...newPast] = state.past;

      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future]
      };
    }

    if (action.type === REDOO) {
      const [newPresent, ...newFuture] = state.future;

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture
      };
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    };
  };

  return useReducer(undoReducer, undoState);
};

/*
 * we will create a reducer, that will take a normal reducer & give it all the time travelling ability.
 * we are using a custom hook like "useReducer", which will take the normal reducer & initialstate named,
 * "useUndoReducer", which will have a special reducer which will handle the (past, present, future),
 * also it will run the normal reducer (business-logic) to handle the "add_grudge" or "forgiveness" to get the present state,
 * This will separate the time travel part from the actual change in the business logic(normal-reducer).
 * so i can use this special reducer when ever i need to implement 'undo-redo', just have to use,
 * "useUndoReducer instead of "useReducer"
 */
