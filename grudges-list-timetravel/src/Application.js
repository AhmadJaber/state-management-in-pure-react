import React, { useContext } from 'react';
import { GrudgeContext } from './context/GrudgeContext';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

const Application = () => {
  const { undo, havePast } = useContext(GrudgeContext);

  return (
    <div className="Application">
      <NewGrudge />

      <br />
      <section>
        <button disabled={!havePast} onClick={undo}>
          undo
        </button>
        <button style={{ marginLeft: '1rem' }}>redo</button>
      </section>

      <Grudges />
    </div>
  );
};

export default Application;
