import { useState, useEffect } from 'react';

const useLocalStorage = (initialState, storageName) => {
  const getStateFromStorage = () => {
    const stateObj = localStorage.getItem(storageName);

    if (stateObj) return JSON.parse(stateObj).value;
    return initialState;
  };
  console.log(getStateFromStorage());
  const [value, setvalue] = useState(getStateFromStorage());

  useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify({ value }));
    console.log(localStorage);
  }, [value, storageName]);

  return [value, setvalue];
};

export default useLocalStorage;
