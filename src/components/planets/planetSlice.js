import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPlanetCount: 0,
  planets: [],
  selectedPlanets: {}
};
export const counterSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    addPlanets: (state, action) => {
      state.planets = action.payload;
    },
    select: (state, action) => {
      const selectedPlanet = state.planets[action.payload];
      state.selectedPlanets[action.payload] = {
        ...selectedPlanet,
        id: action.payload
      };
      state.selectedPlanetCount += 1;
    },
    deselect: (state, action) => {
      state.selectedPlanetCount -= 1;
      delete state.selectedPlanets[action.payload];
    },
    resetPlanets: (state) => initialState
  }
});

export const {
  select,
  deselect,
  addPlanets,
  resetPlanets
} = counterSlice.actions;

export const selectCount = (state) => state.planets.selectedPlanetCount;
export const getPlanets = (state) => state.planets.planets;
export const getSelectedPlanets = (state) => state.planets.selectedPlanets;

export default counterSlice.reducer;
