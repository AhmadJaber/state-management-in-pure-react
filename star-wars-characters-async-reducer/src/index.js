import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useThunkReducer } from './hooks/useThunkReducer';
import { ERROR, FETCHING_COMPLETED, LOADING } from './constants/constants';
import { fetchCharacters } from './utils/fetch';
import CharacterList from './CharacterList';
import CharacterView from './CharacterView';
import './styles.scss';

const reducer = (state, action) => {
  if (action.type === LOADING) {
    return {
      characters: [],
      loading: true,
      error: null,
    };
  }

  if (action.type === FETCHING_COMPLETED) {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null,
    };
  }

  if (action.type === ERROR) {
    return {
      characters: [],
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

const initialState = {
  error: null,
  loading: false,
  characters: [],
};

const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { characters } = state;

  // if i want to load data, when app loaded, use fetchCharacters function here
  useEffect(() => {
    dispatch((dispatch) => {});
  }, [dispatch]);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchCharacters)}>
            Fetch Characters
          </button>
          <CharacterList characters={characters} />
        </section>
        <section className="CharacterView">
          <Route path="/characters/:id" component={CharacterView} />
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
