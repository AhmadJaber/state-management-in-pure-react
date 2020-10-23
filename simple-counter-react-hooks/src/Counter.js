import React, { useEffect, useRef } from 'react';
import { useLocalStorage } from './context/useLocalStorage';

const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, 'counter');
  // useRef() to persist state between render, also get th eprevious count
  const countRef = useRef(0); // countRef = {current: null}

  // finding current count is bigger/smaller than previous count
  let message = '';
  if (countRef.current < count) message = 'Higher';
  if (countRef.current > count) message = 'Lower';

  // setting the value of the reference, which will presist between render
  countRef.current = count;

  useEffect(() => {
    document.title = `Counter: ${count}`;
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

  /*
   * Anytime we use something that re-occurs, we need to clear that when component unmount
   * Like - setInterval, websocket connections. A trivial example ->
   * if we don't clean that, for every count change, useEffect callbackfunction will register a new
   * interval without cleaning the previous one, which will create a mess.
   */
  useEffect(() => {
    const id = setInterval(() => {
      console.log(`count: ${count}`);
    }, 3000);

    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="Counter">
      <p>{message}</p>
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;
