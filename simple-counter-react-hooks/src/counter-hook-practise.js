import React, { useState, useEffect } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');

  if (storage) return JSON.parse(storage);
  return { state: 0 };
};

const setStateInLocalStorage = (state) => {
  localStorage.setItem('counterState', JSON.stringify({ state }));
  console.log(localStorage);
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(getStateFromLocalStorage().state);

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  useEffect(() => {
    setStateInLocalStorage(count);
  }, [count]);

  const increment = () => {
    setCount((count) => {
      if (count >= max) return count;
      return count + step;
    });
  };
  const decrement = () => {
    setCount((count) => {
      if (count <= 0) return count;
      return count - step;
    });
  };
  const reset = () => setCount(0);

  return (
    <main className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </main>
  );
};

export default Counter;
