import React, { Component } from 'react';

/*
* This will give us the opportunity for easy unit-testing
* Also can be used as reusable logic
const increment = (state, props) => {
  const { max, step } = props;
  if (state.count >= max) {
    return;
  }

  return { count: state.count + step };
};

* decrement function
const decrement = (state, props) => {
  const { step } = props;
  if (state.count <= 0) return;

  return { count: state.count - step };
};
*/

const getCountFromLocalStorage = () => {
  const storage = localStorage.getItem('counter');

  // check if the storage is undefined or null before parsing from string to object
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const setCountToLocalStorage = (state) => {
  localStorage.setItem('counter', JSON.stringify(state));
  console.log(localStorage);
};

class Counter extends Component {
  state = getCountFromLocalStorage();

  /*
  setCountToLocalStorage = () => {
    localStorage.setItem('counter', JSON.stringify(this.state));
    console.log(localStorage);
  };
  */

  // update document title on state-change
  updateDocumentTitle = () => {
    document.title = `Count: ${this.state.count}`;
  };

  increment = () => {
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) {
          return;
        }

        return { count: state.count + step };
      },
      () => {
        // after updating of state, set that count to localstorage to be saved
        setCountToLocalStorage(this.state);

        // * if i wanted to use that function inside of the class
        // this.setCountToLocalStorage()

        this.updateDocumentTitle();
      },
    );
  };

  decrement = () => {
    this.setState(
      (state, props) => {
        const { step } = props;
        if (state.count <= 0) return;

        return { count: state.count - step };
      },
      () => {
        setCountToLocalStorage(this.state);
        this.updateDocumentTitle();
      },
    );
  };

  reset = () => {
    this.setState({ count: 0 }, () => {
      setCountToLocalStorage(this.state);
      this.updateDocumentTitle();
    });
  };

  render() {
    const { count } = this.state;

    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
