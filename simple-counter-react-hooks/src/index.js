import React from 'react';
import { render } from 'react-dom';
import Counter from './Counter';
// import CounterExercise from './CounterExercise';

import './styles.scss';

const Application = () => {
  return (
    <main className="Application">
      <section className="Counters">
        <Counter max={15} step={5} />

        {/* <CounterExercise max={15} step={5} /> */}
      </section>
    </main>
  );
};

render(<Application />, document.getElementById('root'));
