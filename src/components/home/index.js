import React from 'react';
import { useDispatch } from 'react-redux';
import { resetPlanets } from '../planets/planetSlice';
import { resetVehicles } from '../vehicles/vehicleSlice';
import { Button } from '../button/button';
import './home.css';

export function Home() {
  const dispatch = useDispatch();
  dispatch(resetPlanets());
  dispatch(resetVehicles());
  return (
    <div className="home-container">
      <div>
        <p>
          Our problem is set in the planet of Lengaburu...in the distant distant
          galaxy of Tara B. After the recent war with neighbouring planet
          Falicornia, King Shan has exiled the Queen of Falicornia for 15 years.
          Queen Al Falcone is now in hiding. But if King Shan can find her
          before the years are up, she will be exiled for another 15 years....
        </p>
      </div>
      <Button title={'Start'} nextRoute={'/planets'} />
    </div>
  );
}
