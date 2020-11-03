import React, { useEffect, useState } from 'react';
import { URL } from './endpoint';

const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});

  // if do not use dependency in this case, it will bite me later
  useEffect(() => {
    fetch(`${URL}/characters/${match.params.id}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data.result[0]));
  }, [match.params.id]);

  console.log(character);
  return Object.values(character).length ? (
    <section className="CharacterView">
      <h2>{character.name}</h2>
      <ul className="CharacterDetails">
        <li>
          <strong>Birth Year</strong>: {character.birthYear}
        </li>
        <li>
          <strong>Eye Color</strong>: {character.eyeColor}
        </li>
        <li>
          <strong>Gender</strong>: {character.gender}
        </li>
        <li>
          <strong>Hair Color</strong>: {character.hairColor}
        </li>
        <li>
          <strong>Heigh</strong>: {character.height}
        </li>
        <li>
          <strong>Mass</strong>: {character.mass}
        </li>
        <li>
          <strong>Skin Color</strong>: {character.skinColor}
        </li>
      </ul>
    </section>
  ) : (
    <h4>Loading......</h4>
  );
};

export default CharacterView;
