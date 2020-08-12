import React, { useState, useRef, memo } from 'react';

const Count = memo(({ onOdd, data }) => {
  const [count, setCount] = useState(0);
  const renders = useRef(0);
  console.log('count');
  return (
    <div>
      <h4>Count: {count}</h4>
      <h4>Renders: {renders.current++}</h4>
      <button
        onClick={() => {
          if (count % 2 === 0) {
            onOdd();
          }
          setCount((c) => c + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
});

export default Count;
