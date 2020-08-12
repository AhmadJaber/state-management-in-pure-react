import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import Count from './Count';

const App = () => {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  const onOdd = useCallback(() => setText(''), [setText]);

  // for static object
  // const data = useMemo(() => ({ isEven: false }), []);

  // for dynamic object
  const data = useMemo(
    () => ({
      text2,
      forgiven: text2.length % 2 === 0,
    }),
    [text2]
  );

  return (
    <div className="App">
      <input
        type="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <input
        type="text"
        value={text2}
        onChange={(event) => {
          setText2(event.target.value);
        }}
      />
      <Count onOdd={onOdd} data={data} />
    </div>
  );
};

export default App;
