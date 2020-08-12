### memo in React to Optimize renders

##### `React.memo()` does a shallow comparison for `Functions` & `Objects`

- So, If we pass a function as prop, the `React.memo()` doesn't work.
- Because we are passing a new function in every render, though the function is same.
- To Solve this we have to use a hook `useCallback(function(){}, [dependency])` with `memo`

```js
const onOdd = useCallback(() => setText(''), [setText]);
```

- For, `Objects` For every render the reference of the object changes, so `memo` thinks it is new `Object`
- To Solve this, we have few ways -

- First, use `React.memo()` second parameter, a function which can take `(prevProps, nextProps)`

```js
(prevProps, nextProps) => {
  if (prevProps.data.forgiven !== nextProps.data.forgiven) {
    return false;
  }

  return true;
};
```

- Or, use a hook `useMemo(() => (object), [dependency])`

```js
// for static object
const data = useMemo(() => ({ isEven: false }), []);
```

```js
// for dynamic object
const data = useMemo(
  () => ({
    text2,
    forgiven: text2.length % 2 === 0,
  }),
  [text2]
);
```
