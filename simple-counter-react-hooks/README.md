## Refactoring to Hooks

Hooks are a new pattern that allow us to write a lot less code. Get ready to delete some code.

Let's start by deleting everything but the render method.

```js
const Counter = ({ max }) => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <main className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </main>
  );
};
```

So, what _don't_ we have to do here?

- We don't have to `bind` anything.
- We dont need a reference to this.
- We don't need a `constructor` at all.

### Running Some of Our Previous Experiments

What if we tripled up again?

```js
const increment = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
```

Okay, so that makes sense.

It also turns out that `useState` setters can take functions too.

```js
const increment = () => {
  setCount(c => c + 1);
};
```

Unlike using values, using functions also works the same way as it does with `this.setState`.

```js
const increment = () => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
};
```

There is an important difference. You get _only_ the state in this case. There is no second argument with the props. That said, we have them in scope.

They also do _not_ support callback functions like `this.setState`. Later on, we'll use `useEffect` to trigger side effects based on state changes.

Earlier with `this.setState`, we ended up returning `undefined` if our count had hit the max. What if we did something similar here?

```js
setCount(c => {
  if (c >= max) return;
  return c + 1;
});
```

Oh—it explodes after ten. This is core to the difference between how `useState` and `this.setState` works.

With `this.setState`, we're giving the component that object of values that it needs to update. With `useState`, we've got a dedicated function to change a particular piece of state.

How can we fix this?

```js
setCount(c => {
  if (c >= max) return c;
  return c + 1;
});
```

## A Brief Introduction to useEffect

We're going to go a bit deeper into `useEffect`, but let's do the high level now.

Use effect allows us to implement some kind of side effect in our component outside of the changes to state and props triggering a new render.

This is useful for a ton of reasons:

- Storing stuff in `localStorage`.
- Making AJAX requests.

### Implementing `localStorage`

Let's get the basic set up in place here.

Here is a reminder of that function of getting from `localStorage`.

```js
const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};
```

We'll read the count property from `localStorage`.

```js
const [count, setCount] = React.useState(getStateFromLocalStorage().count);
```

Now, we'll register a side effect.

```js
React.useEffect(() => {
  localStorage.setItem('counterState', JSON.stringify({ count }));
}, [count]);
```

The coolest part about this is that it works for `increment`, `decrement`, and `reset` all at once.

### Quick Exercise

Register an effect that updates the document title.

### Pulling It Out Into a Custom Hook

```js
const getStateFromLocalStorage = (defaultValue, key) => {
  const storage = localStorage.getItem(key);
  if (storage) return JSON.parse(storage).value;
  return defaultValue;
};

const useLocalStorage = (defaultValue, key) => {
  const initialValue = getStateFromLocalStorage(defaultValue, key);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};
```

Now, we just never think about it again.

```js
const [count, setCount] = useLocalStorage(0, 'count');
```

### Understanding the Differences Between Class Components

Okay, now—let's switch over to the class-based implementation in `component-state-completed`.

We'll add this:

```js
componentDidUpdate() {
  setTimeout(() => {
    console.log(`Count: ${this.state.count}`);
  }, 3000);
}
```

The delay is intended to just create some space between the click and what we long to the console

Let's switch to a Hooks-based component on the `hooks` branch.

```js
React.useEffect(() => {
  setTimeout(() => {
    console.log(`Count: ${count}`);
  }, 3000);
}, [count]);
```

That's a much different result, isn't it?

Could we implement the older functionality with this newer syntax?

```js
const countRef = React.useRef();
countRef.current = count;

React.useEffect(() => {
  setTimeout(() => {
    console.log(`You clicked ${countRef.current} times`);
  }, 3000);
}, [count]);
```

This is actually persisted between renders.

This pattern can be useful if you need to know about the previous state of the the component.

```js
const countRef = React.useRef();
let message = '';

if (countRef.current < count) message = 'Higher';
if (countRef.current > count) message = 'Lower';

countRef.current = count;
```

### Cleaning Up After `useEffect`

Let's add the ability to add and remove counters.

```js
const [counters, setCounters] = useState([id(), id()]);

const addCounter = () => setCounters([...counters, id()]);
const removeCounter = () => setCounters(counters.slice(0, -1));
```

We'll update the component to look something like this:

```js
<main className="Application">
  {counters.map(id => (
    <Counter id={id} key={id} />
  ))}
  <section className="controls">
    <button onClick={addCounter}>Add Counter</button>
    <button onClick={removeCounter}>Remove</button>
  </section>
</main>
```

What if we did something like this in the `Counter`?

```js
useEffect(() => {
  const interval = setInterval(() => {
    console.log({ id, count });
  }, 3000);
}, [id, count]);
```

Hmm… that has some weird effects.

Let's do better.

```js
useEffect(() => {
  const interval = setInterval(() => {
    console.log({ id, count });
  }, 3000);
  return () => {
    clearInterval(interval);
  };
}, [id, count]);
```
