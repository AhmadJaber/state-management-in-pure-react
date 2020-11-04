import React, { useContext } from 'react';
import { GrudgeContext } from './context/GrudgeContext';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

const Application = () => {
  const { undo, havePast, haveFuture, redoo } = useContext(GrudgeContext);

  return (
    <div className="Application">
      <NewGrudge />

      <br />
      <section>
        <button disabled={!havePast} onClick={undo} className="full-width">
          undo
        </button>
        <button disabled={!haveFuture} className="full-width" onClick={redoo}>
          redo
        </button>
      </section>

      <Grudges />
    </div>
  );
};

export default Application;
