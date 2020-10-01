import { configureStore } from '@reduxjs/toolkit';
import planetReducer from '../components/planets/planetSlice';
import vehicleReducer from '../components/vehicles/vehicleSlice'

export default configureStore({
  reducer: {
    planets: planetReducer,
    vehicles: vehicleReducer
  }
});
