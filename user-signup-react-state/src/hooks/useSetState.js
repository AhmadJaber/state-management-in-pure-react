import { useReducer } from "react";

const reducer = (previousState = {}, updatedState = {}) => {
  console.log("updatedstate", updatedState);
  return { ...previousState, ...updatedState };
};

export const useSetState = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = (updatedState) => dispatch(updatedState);

  return [state, setState];
};

// want to create a custom hook, that work like "setState", to handle form event efficiently
/*
* pattern
const handleChange = (event) => {
  this.setState({[event.target.name]: event.target.value})
}
*/
