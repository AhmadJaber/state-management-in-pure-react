import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';
import { GrudgeProvider } from './Context/GrudgesContext';

import './styles.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <GrudgeProvider>
    <Application />
  </GrudgeProvider>,
  rootElement
);
