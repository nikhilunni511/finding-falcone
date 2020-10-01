import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  select,
  deselect,
  selectCount,
  addPlanets,
  getPlanets,
  getSelectedPlanets
} from './planetSlice';
import {Error} from '../error'
import axios from 'axios';
import { Box } from '../box/box';
import { Button } from '../button/button';
import './planets.css';

export function Planets() {
  const planets = useSelector(getPlanets);
  const selectedPlanets = useSelector(getSelectedPlanets);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [hasError, setError] = useState(false)
  useEffect(() => {
    if (!planets.length) {
      axios.get(`https://findfalcone.herokuapp.com/planets`).then((res) => {
        if (res && res.data) {
          dispatch(addPlanets(res.data));
        }
      }).catch(() => setError(true));
    }
  }, []);
  const handleClick = (planetId) => {
    selectedPlanets.hasOwnProperty(planetId)
      ? dispatch(deselect(planetId))
      : dispatch(select(planetId));
  };

  return (
    <div className="planet-container">
      {hasError && <Error/>}
      {!hasError && planets.length > 0 && <><p>Select planets you want to search in</p>
      <div className="box-container">
        {planets.map((item, index) => (
          <Box
            key={index}
            isSelected={selectedPlanets.hasOwnProperty(index)}
            planet={item}
            id={index}
            onClick={handleClick}
            hasList={false}
            enable={count >= 4 && !selectedPlanets.hasOwnProperty(index)}
          />
        ))}
      </div>
      {planets.length > 0 && (
        <Button
          title={'Continue'}
          nextRoute={'/vehicles'}
          disable={count < 4}
        />
      )}</>}
    </div>
  );
}
