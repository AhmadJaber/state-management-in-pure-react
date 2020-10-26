# Grudges (Frontend Masters: React State)

We're starting out with a basic version of an application that uses hooks to manage state.

There are two issues that we'd like to solve for.

- **Prop drilling**: `Grudges` needs to receive `toggleForgiveness` even though it will never use it. It's just passing it down to `Grudge`.
- **Needless re-renders**: Everything re-renders even when we just check a single checkbox. We could try to get clever with some of React's performance helpers—or we can just manage our state better.

## Introducting the Application

- Turn on the "Highlight updates when components render." feature in the React developer tools.
- Notice how a checking a checkbox re-renderers everything.
- Notice how this is not the case in `NewGrudge`.

## Using a Reducer

We could try to get clever here with `useCallback` and `React.memo`, but since we're always replacing the array of grudges, this is never really going to work out.

What if we took a different approach to managing state?

Let's make a new file called `reducer.js`.

```js
const reducer = (state = [], action) => {
  return state;
};
```

And then we swap out that `useState` with a `useReducer`.

```js
const [grudges, dispatch] = useReducer(reducer, initialState);
```

We're going to create an action type and an action creator.

```js
const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';
```

```js
const addGrudge = ({ person, reason }) => {
  dispatch({
    type: GRUDGE_ADD,
    payload: {
      person,
      reason
    }
  });
};
```

We'll add it to the reducer.

```js
const reducer = (state = [], action) => {
  if (action.type === GRUDGE_ADD) {
    return [
      {
        id: id(),
        ...action.payload
      },
      ...state
    ];
  }
  return state;
};
```

### Forgiveness

Let's make an action creator

```js
const forgiveGrudge = id => {
  dispatch({
    type: GRUDGE_FORGIVE,
    payload: {
      id
    }
  });
};
```

We'll also update the reducer here.

```js
if (action.type === GRUDGE_FORGIVE) {
  return state.map(grudge => {
    if (grudge.id === action.payload.id) {
      return { ...grudge, forgiven: !grudge.forgiven };
    }
    return grudge;
  });
}
```

We'll thread through `forgiveGrudge` as `onForgive`.

```js
<button onClick={() => onForgive(grudge.id)}>Forgive</button>
```

That prop drilling isn't great, but we'll deal with it in a bit.

## Memoization

- Wrap the action creators in `useCallback`
- Wrap `NewGrudge` and `Grudge` in `React.memo`
- Notice how we can reduce re-renders
