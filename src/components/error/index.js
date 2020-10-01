import React from 'react';
import { Button } from '../button/button';

export function Home() {
  return (
    <div>
      <div>
        <h1>Something went wrong!</h1>
      </div>
      <Button title={'Restart'} nextRoute={'/'} />
    </div>
  );
}
