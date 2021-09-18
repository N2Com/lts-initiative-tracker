import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  init,
} from "./counterSlice";
import styles from "./Counter.module.css";

function Counter(props) {
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={props.decrement}
        >
          -
        </button>
        <span className={styles.value}>{props.count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={props.increment}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => props.incrementByAmount(incrementValue)}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => props.incrementAsync(incrementValue)}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => props.incrementIfOdd(incrementValue)}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    incrementIfOdd: (value) => {dispatch(incrementIfOdd(value)); dispatch(init())},
    incrementAsync: (value) => dispatch(incrementAsync(value)),
    incrementByAmount: (value) => dispatch(incrementByAmount(value)),
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  };
}

function mapStateToProps(state) {
  return { count: state.counter.value };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
