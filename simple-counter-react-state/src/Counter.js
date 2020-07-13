import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
  }

  updateDocumentTitle = () => {
    document.title = `Count ${this.state.count}`;
  };

  increment = () => {
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) return;
        return { count: state.count + step };
      },
      () => {
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
        this.updateDocumentTitle();
      },
    );
  };

  reset = () => {
    this.setState({ count: 0 }, () => {
      this.updateDocumentTitle();
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
