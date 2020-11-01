import React from 'react';
import { Link } from 'react-router-dom';

const CharacterListItem = ({ character }) => {
  const { id, name } = character;
  return (
    <article className="CharacterListItem">
      <Link className="CharacterListItemLink" to={`/characters/${id}`}>
        {name}
      </Link>
    </article>
  );
};

export default CharacterListItem;
