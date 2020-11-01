/*
 *  This way is correct but not efficient enough, because we have to fetch many apis in our app
 *  Best way would be create a custom hook that will handle the fetching
 */

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterList from './CharacterList';
import { URL } from './endpoint';

import './styles.scss';

const Application = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setCharacters([]); // optional, app preference
    setError(null);

    fetch(URL + '/characters')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCharacters(data.results);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.error(error);
      });
  }, []);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <h3>Loading....</h3>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);

/*
 *  This way is correct but not efficient enough, because we have to fetch many apis in our app
 *  Best way would be create a custom hook that will handle the fetching
 */
