import React, { useEffect, useState, useRef } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const prevCount = useRef();

  useEffect(() => {
    prevCount.current = count;
  });

  useEffect(() => {
    const id = setInterval(() => {
      console.log(`Counter ${count}`);
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });

  const messageValue = () => {
    let message = '';

    if (prevCount.current > count) return (message = 'Lower');
    if (prevCount.current < count) return (message = 'Higher');

    return message;
  };

  /*
  * inside useEffect every function call is unique, so
  * so , i am getting the copy of state in every function calll
  useEffect(() => {
    setTimeout(() => {
      console.log(`Counter: ${count}`);
    }, 3000);
  });
  */

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <main className="Counter">
      <p className="count">{count}</p>
      <h3>{messageValue()}</h3>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </main>
  );
};

export default Counter;
