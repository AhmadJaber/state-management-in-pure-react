import React, { useContext, useState } from 'react';
import { GrudgeContext } from './context/GrudgeContext';
// import { GrudgeObjectContext } from './objectdata/GrudgeObjectContext';

const NewGrudge = ({ onSubmit }) => {
  const [person, setPerson] = useState('');
  const [reason, setReason] = useState('');
  const { addGrudge } = useContext(GrudgeContext);

  console.log('newGrudge component rendered');

  const handleChange = (event) => {
    event.preventDefault();
    addGrudge({ person, reason });
    setPerson('');
    setReason('');
  };

  return (
    <form className="NewGrudge" onSubmit={handleChange}>
      <input
        className="NewGrudge-input"
        placeholder="Person"
        type="text"
        value={person}
        onChange={(event) => setPerson(event.target.value)}
      />
      <input
        className="NewGrudge-input"
        placeholder="Reason"
        type="text"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
      />
      <input className="NewGrudge-submit button" type="submit" />
    </form>
  );
};

export default NewGrudge;
