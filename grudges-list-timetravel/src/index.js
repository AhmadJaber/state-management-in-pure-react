import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import './styles.css';

import { GrudgeProvider } from './context/GrudgeContext';
// import { GrudgeObjectProvider } from './objectdata/GrudgeObjectContext';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <GrudgeProvider>
    <Application />
  </GrudgeProvider>,
  rootElement
);
