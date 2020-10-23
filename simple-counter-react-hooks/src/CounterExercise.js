import React, { useEffect, useState } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counter');

  if (storage) return JSON.parse(storage).state;
  return 0;
};

const setStateInLocalStorage = (state) => {
  localStorage.setItem('counter', JSON.stringify({ state }));
  console.log(localStorage);
};

const CounterExercise = ({ max, step }) => {
  const [count, setCount] = useState(getStateFromLocalStorage());

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  useEffect(() => {
    setStateInLocalStorage(count);
  }, [count]);

  const increment = () => {
    setCount((c) => {
      if (c >= max) return c;
      return c + step;
    });
  };

  const decrement = () => {
    setCount((c) => {
      if (c <= 0) return c;
      return c - step;
    });
  };

  const reset = () => setCount(0);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default CounterExercise;
