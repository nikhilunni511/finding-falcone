import React from 'react';
import { useHistory } from 'react-router-dom';

import './button.css';
export function Button(props) {
  const history = useHistory();
  function handleClick() {
    history.push(props.nextRoute);
  }
  return (
    <div className="button-container">
      <button
        className="button-title"
        onClick={handleClick}
        disabled={props.disable}
      >
        {props.title}
      </button>
    </div>
  );
}
