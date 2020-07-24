import React from 'react';
import { render } from 'react-dom';

import Counter from './CounterAdvanced';

import './styles.scss';

const Application = () => {
  return (
    <main className='Application'>
      <section className='Counters'>
        <Counter max={20} step={5} />
      </section>
    </main>
  );
};

render(<Application />, document.getElementById('root'));
