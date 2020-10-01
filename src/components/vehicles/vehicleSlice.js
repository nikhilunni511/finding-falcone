import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  vehicles: [],
  availableVehicles: [],
  selectedVehicles: {},
  timeTaken: 0
};
export const counterSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    addVehicles: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.vehicles = action.payload;
      state.availableVehicles = action.payload;
    },
    selectVehicle: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { selectedVehicleId, vehicle, planet } = action.payload;
      let oldSpeed = 0;
      if (state.selectedVehicles[planet.id]) {
        const oldVehicle = state.selectedVehicles[planet.id];
        oldSpeed = planet.distance / oldVehicle.speed;
        state.availableVehicles.map((item, index) => {
          if (item.name === oldVehicle.name)
            state.availableVehicles[index].total_no += 1;
        });
      }
      state.selectedVehicles[planet.id] =
        state.availableVehicles[selectedVehicleId];
      state.timeTaken =
        state.timeTaken + planet.distance / vehicle.speed - oldSpeed;
      state.availableVehicles[selectedVehicleId].total_no -= 1;
    },
    resetVehicles: (state) => initialState
  }
});

export const {
  selectVehicle,
  addVehicles,
  resetVehicles
} = counterSlice.actions;

export const selectCount = (state) => state.planets.selectedPlanets.length;
export const getVehicles = (state) => state.vehicles.vehicles;
export const getAvailableVehicles = (state) => state.vehicles.availableVehicles;
export const getSelectedVehicles = (state) => state.vehicles.selectedVehicles;
export const getTimeTaken = (state) => state.vehicles.timeTaken;

export default counterSlice.reducer;
