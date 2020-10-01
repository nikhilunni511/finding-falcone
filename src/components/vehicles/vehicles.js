import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  addVehicles,
  getVehicles,
  getAvailableVehicles,
  selectVehicle,
  getSelectedVehicles,
  getTimeTaken
} from './vehicleSlice';
import {Error} from '../error'
import { useHistory } from 'react-router-dom';
import { getSelectedPlanets } from '../planets/planetSlice';
import { Box } from '../box/box';
import './vehicles.css';
import { Button } from '../button/button';

export function Vehicles() {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedPlanets = useSelector(getSelectedPlanets) || {};
  const vehicles = useSelector(getVehicles) || {};
  const availableVehicles = useSelector(getAvailableVehicles) || {};
  const selectedVehicles = useSelector(getSelectedVehicles) || {};
  const timeTaken = useSelector(getTimeTaken) || 0;
  const [hasError, setError] = useState(false)
  if (
    Object.keys(selectedPlanets).length === 0 &&
    selectedPlanets.constructor === Object
  ) {
    history.push('/');
  }
  useEffect(() => {
    if (!vehicles.length) {
      axios
        .get(`https://findfalcone.herokuapp.com/vehicles`)
        .then((res) => {
          if (res && res.data) {
            dispatch(addVehicles(res.data));
          }
        })
        .catch(() => setError(true));
    }
  }, [selectedVehicles]);
  const onSelectVehicle = (vehicle, planet) => {
    dispatch(
      selectVehicle({
        selectedVehicleId: vehicle,
        vehicle: availableVehicles[vehicle],
        planet
      })
    );
  };
  return (
    <div className="vehicle-container">
      {hasError && <Error/>}
      {!hasError && vehicles.length > 0 &&<><p>Choose the vehicles</p>
      <p>Time taken : {timeTaken}</p>
      <div className="box-container">
        {Object.keys(selectedPlanets).map((planet, index) => (
          <Box
            key={index}
            planet={selectedPlanets[planet]}
            hasList={true}
            options={availableVehicles}
            enable={true}
            onChange={onSelectVehicle}
            selectedVehicles={selectedVehicles}
          />
        ))}
      </div>
      <Button
        title={'Find falcone'}
        nextRoute={'/find'}
        disable={Object.keys(selectedVehicles).length < 4}
      /></>}
    </div>
  );
}
