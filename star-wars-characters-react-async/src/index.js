import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterList from './CharacterList';
// import { useFetch } from './hooks/useFetch';
// import { useFetchAsyncAwait } from './hooks/useFetchAsyncAwait';

import { useFetchWithReducer } from './hooks/useFetchWithReducer';
import { URL } from './endpoint';

import './styles.scss';

const Application = () => {
  const [response, loading, error] = useFetchWithReducer(URL + '/characters');
  const characters = (response && response.results) || [];

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
