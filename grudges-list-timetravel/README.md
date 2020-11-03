## Implementing Undo and Redo
**Advanced state-management with reducer.**

We need to think about the past, present, and future.

```js
const defaultState = {
  past: [],
  present: [],
  future: []
};
```

We've broken almost everything. So, let's make this a bit better.

```js
const reducer = (state, action) => {
  if (action.type === ADD_GRUDGE) {
    return {
      past: [],
      present: [
        {
          id: uniqueId(),
          ...action.payload
        },
        ...state.present
      ],
      future: []
    };
  }

  if (action.type === FORGIVE_GRUDGE) {
    return {
      past: [],
      present: state.present.filter(grudge => grudge.id !== action.payload.id),
      future: []
    };
  }

  return state;
};
```

### Adding to the Stack

```js
past: [state.present, ...state.past];
```

```js
if (action.type === UNDO) {
  const [newPresent, ...newPast] = state.past;
  return {
    past: newPast,
    present: newPresent,
    future: [state.present, ...state.present]
  };
}
```

```js
const undo = useCallback(() => {
  dispatch({ type: UNDO });
}, [dispatch]);
```

```js
<button disabled={!state.past.length} onClick={undo}>
  Undo
</button>
```

### Getting Redo

```js
if (action.type === REDO) {
  const [newPresent, ...newFuture] = state.future;
  return {
    past: [state.present, ...state.past],
    present: newPresent,
    future: newFuture
  };
}
```

## Abstracting All of This

```js
const useUndoReducer = (reducer, initialState) => {
  const undoState = {
    past: [],
    present: initialState,
    future: []
  };

  const undoReducer = (state, action) => {
    const newPresent = reducer(state, action);

    if (action.type === UNDO) {
      const [newPresent, ...newPast] = state.past;
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future]
      };
    }

    if (action.type === REDO) {
      const [newPresent, ...newFuture] = state.future;
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture
      };
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    };
  };

  return useReducer(undoReducer, undoState);
};
```

## Implementing a React/Redux-like Abstraction

Let's make a new file called `connect.js`.

We'll start with some simple imports.

```js
import React, { createContext, useReducer } from 'react';
import initialState from './initialState';
import id from 'uuid/v4';
```

Let's also pull in the action types and reducer from `GrudgeContext.js`.

```js
export const GRUDGE_ADD = 'GRUDGE_ADD';
export const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

export const reducer = (state = [], action) => {
  if (action.type === GRUDGE_ADD) {
    return [
      {
        id: id(),
        ...action.payload
      },
      ...state
    ];
  }

  if (action.type === GRUDGE_FORGIVE) {
    return state.map(grudge => {
      if (grudge.id === action.payload.id) {
        return { ...grudge, forgiven: !grudge.forgiven };
      }
      return grudge;
    });
  }

  return state;
};
```

We'll also want to create a context that we can use.

Alright, so now we'll make a new provider that will take the reducer's state and dispatch and thread it through the application.

Okay, let's make a generalized `Provider`.

```js
export const Provider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
```

Next, we'll make the `connect` function.

```js
export const connect = (
  mapStateToProps,
  mapDispatchToProps
) => Component => ownProps => {
  const { state, dispatch } = useContext(Context);

  let stateProps = {};
  let dispatchProps = {};

  if (isFunction(mapStateToProps)) {
    stateProps = mapStateToProps(state, ownProps);
  }

  if (isFunction(mapDispatchToProps)) {
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
  }

  Component.displayName = `Connected(${Component.displayName})`;

  return <Component {...stateProps} {...dispatchProps} {...ownProps} />;
};
```

We're going to make three container functions:

- `NewGrudgeContainer`
- `GrudgesContainer`
- `GrudgeContainer`

We're also going to need to rip the previous context out of.

#### index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';

import { reducer, Provider } from './connect';
import initialState from './initialState';

import './styles.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider reducer={reducer} initialState={initialState}>
    <Application />
  </Provider>,
  rootElement
);
```

#### GrudgesContainer.js

```js
import { connect } from './connect';
import Grudges from './Grudges';

const mapStateToProps = state => {
  console.log({ state });
  return { grudges: state };
};

export default connect(mapStateToProps)(Grudges);
```

#### GrudgeContainer.js

```js
import { connect, GRUDGE_FORGIVE } from './connect';
import Grudge from './Grudge';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    forgive() {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: {
          id: ownProps.grudge.id
        }
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(Grudge);
```

#### Grudges.js

```js
import React from 'react';
import GrudgeContainer from './GrudgeContainer';

const Grudges = ({ grudges }) => {
  return (
    <section className="Grudges">
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map(grudge => (
        <GrudgeContainer key={grudge.id} grudge={grudge} />
      ))}
    </section>
  );
};

export default Grudges;
```

#### Grudge.js

```js
import React from 'react';
import { GrudgeContext } from './GrudgeContext';

const Grudge = React.memo(({ grudge, forgive }) => {
  return (
    <article className="Grudge">
      <h3>{grudge.person}</h3>
      <p>{grudge.reason}</p>
      <div className="Grudge-controls">
        <label className="Grudge-forgiven">
          <input type="checkbox" checked={grudge.forgiven} onChange={forgive} />{' '}
          Forgiven
        </label>
      </div>
    </article>
  );
});

export default Grudge;
```

#### Exercise

Can you implement `NewGrudgeContainer`?

