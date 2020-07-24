import React, { Component } from 'react';

/*
* Pulled the function out of the component for easier unit testing.
  const increment = (state, props) => {
    const { max, step } = props;
    if (state.count >= max) return;
    return { count: state.count + step };
  };
*/

const setStateInLocalStorage = (state) => {
  localStorage.setItem('countState', JSON.stringify(state));
  console.log(localStorage);
};

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('countState');

  // Before parsing we should check, if the data is undefined or null
  if (storage) JSON.parse(storage);
  return { count: 0 };
};

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = getStateFromLocalStorage();
  }

  /*
    * If i wanted to use this method inside the class
    setStateInLocalStorage = () => {
      localStorage.setItem('countState', JSON.stringify(this.state));
      console.log(localStorage);
    }
  */

  increment = () => {
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) return;
        return { count: state.count + step };
      },
      () => {
        // this.setStateInLocalStorage();
        setStateInLocalStorage(this.state);
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
        setStateInLocalStorage(this.state);
      },
    );
  };

  reset = () => {
    this.setState({ count: 0 }, () => {
      setStateInLocalStorage(this.state);
    });
  };

  render() {
    const { count } = this.state;

    return (
      <div className='Counter'>
        <p className='count'>{count}</p>
        <section className='controls'>
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
