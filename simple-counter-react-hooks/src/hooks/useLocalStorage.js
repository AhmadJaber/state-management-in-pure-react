import { useState, useEffect } from 'react';

export const useLocalStorage = (initialState, storageName) => {
  const getStateFromLocalStorage = () => {
    const storage = localStorage.getItem(storageName);

    if (storage) return JSON.parse(storage).value;
    return initialState;
  };

  const [value, setValue] = useState(getStateFromLocalStorage());

  useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify({ value }));
    console.log(localStorage);
  }, [value, storageName]);

  return [value, setValue];
};
