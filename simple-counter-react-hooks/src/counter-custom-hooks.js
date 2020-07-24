import React, { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, 'counterState');

  console.log(count);
  useEffect(() => {
    document.title = `Counter: ${count}`;
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
