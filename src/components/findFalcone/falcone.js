import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSelectedVehicles, getTimeTaken } from '../vehicles/vehicleSlice';
import { getSelectedPlanets } from '../planets/planetSlice';
import axios from 'axios';
import './falcone.css';
import { Button } from '../button/button';
import './falcone.css';
export function Falcone() {
  const [error, setError] = useState(false);
  const history = useHistory();
  const selectedPlanets = useSelector(getSelectedPlanets) || {};
  const selectedVehicles = useSelector(getSelectedVehicles) || {};
  const timeTaken = useSelector(getTimeTaken);
  const [falcone, setFalconeStatus] = useState(null);
  if (
    Object.keys(selectedPlanets).length === 0 &&
    selectedPlanets.constructor === Object
  ) {
    history.push('/');
  }

  useEffect(() => {
    if (!falcone && !error)
      axios
        .post(`https://findfalcone.herokuapp.com/token`, null, {
          headers: {
            Accept: 'application/json'
          }
        })
        .then((res) => {
          if (res && res.data) {
            const reqParams = {
              token: res.data.token,
              planet_names: Object.keys(selectedPlanets).map(
                (item) => selectedPlanets[item].name
              ),
              vehicle_names: Object.keys(selectedVehicles).map(
                (item) => selectedVehicles[item].name
              )
            };
            axios
              .post(`https://findfalcone.herokuapp.com/find`, reqParams, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                if (res && res.data) {
                  setFalconeStatus(res.data);
                }
              })
              .catch((err) => setError(true));
          }
        })
        .catch((err) => setError(true));
  }, [error, falcone]);
  let message = '';
  if (falcone?.status === 'success') {
    message = (
      <div className="status">
        <p>
          Success! Congratulations on Finding Falcone. King Shan is mightly
          pleased.
        </p>
        <p>Time taken: {timeTaken}</p>
        <p>Planet found: {falcone.planet_name}</p>
      </div>
    );
  } else if (falcone?.status === 'false') {
    message = (
      <div className="status">
        <p>Failed to find falcone!</p>
        <p>Time taken: {timeTaken}</p>
      </div>
    );
  }
  if (error) {
    message = 'Something went wrong!';
  }
  return (
    <div>
      <div className="status-container">{message}</div>
      <Button title={'Start again'} nextRoute={'/'} />
    </div>
  );
}
