import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import styles from "./Counter.module.css";

function Grid(props) {
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

function mapStateToProps(state) {
  return {  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
