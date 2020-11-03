## Dispensing Asynchronous Actions

**MiddleWare**: Reducer (userReducer or redux-reducer) itself doesn't have the idea of asyncchrony, other hooks or components maintain asynchronous staff, to solve that we can use middleware. `Redux-Thunk` is one of middleware in redux that handles asynchronous stuff in reducer. In redux other powerful tools available like - `Redux-Saga`, `Redux-Observables`.

**Thunk**: Thunk is a function returned from another function. The idea of thunk is that it is code to be executed later.
**We will dispatch an action, which will be a function, that will do the fetch staff and dispatch the real action.**

How could we right a simple custom thunk reducer, without redux?

```js
const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    action => {
      if (typeof action === 'function') {
        console.log('It is a thunk');
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch],
  );

  return [state, enhancedDispatch];
};
```

Now, we just use that reducer instead.

We can have a totally separate function for fetching the data that our state management doesn't know anything about.

```js
const fetchCharacters = dispatch => {
  dispatch({ type: 'FETCHING' });
  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: {
          characters: response.characters,
        },
      });
    })
    .catch(error => dispatch({ type: error, payload: { error } }));
};
```

#### Exercise: Implementing Character Search

There is a `CharacterSearch` component. Can you you implement a feature where we update the list based on the search field?

```js
import React from 'react';
import endpoint from './endpoint';

const SearchCharacters = React.memo(({ dispatch }) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    dispatch({ type: 'FETCHING' });
    fetch(endpoint + '/search/' + query)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'RESPONSE_COMPLETE',
          payload: {
            characters: response.characters,
          },
        });
      })
      .catch(error => dispatch({ type: error, payload: { error } }));
  }, [query, dispatch]);

  return (
    <input
      onChange={event => setQuery(event.target.value)}
      placeholder="Search Here"
      type="search"
      value={query}
    />
  );
});

export default SearchCharacters;
```

## The Perils of `useEffect` and Dependencies

We're going to need to important more things.

```js
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CharacterList from './CharacterList';
import CharacterView from './CharacterView';
```

Now, we'll add this little tidbit.

```js
<section className="CharacterView">
  <Route path="/characters/:id" component={CharacterView} />
</section>
```

In `CharacterView`, we'll do the following refactoring:

```js
const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(endpoint + '/characters/' + match.params.id)
      .then(response => response.json())
      .then(response => setCharacter(response.character))
      .catch(console.error);
  }, []);

  // …
};
```

I have an ESLint plugin that solves most of this for us.

```js
const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(endpoint + '/characters/' + match.params.id)
      .then(response => response.json())
      .then(response => setCharacter(response.character))
      .catch(console.error);
  }, []);

  // …
};
```