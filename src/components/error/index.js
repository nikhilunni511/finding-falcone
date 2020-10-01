import React from 'react';
import {Button} from '../button/button'
import './error.css'
export function Error(props) {

  return (
    <div className="error-container">
      <div>
        <p>Something went wrong!</p>
      </div>
      <Button title={'Restart'} nextRoute={'/'}/>
    </div>
  );
}
