import {
   SELECT_BRAND,
   SELECT_MODEL,
   GET_VEHICLES,
   GET_PARTIALS
} from "./vehicleTypes";

// select brand action creator
export const selectBrand = data => ({
   type: SELECT_BRAND,
   selectedBrand: data
});

// select model action creator
export const selectModel = (selectedModelPath, selectedVehicleType) => ({
   type: SELECT_MODEL,
   selectedModel: selectedModelPath,
   selectedVehicleType: selectedVehicleType
});

// Get Vehicles Model Data Action
export const getVehicles = () => ({
   type: GET_VEHICLES
});

// Get Partials Model Data Action
export const getPartials = (selectedVehicleType) => ({
   type: GET_PARTIALS,
   selectedVehicleType: selectedVehicleType
});
