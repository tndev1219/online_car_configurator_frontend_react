import {
   SELECT_BRAND,
   SELECT_MODEL,
   GET_VEHICLES,
   GET_BRANDS,
   GET_PARTIALS,
   GET_LOGO
} from "./vehicleTypes";

// select brand action creator
export const selectBrand = data => ({
   type: SELECT_BRAND,
   selectedBrand: data
});

// select model action creator
export const selectModel = (selectedVehicleModelPath, selectedVehicleImagePath, selectedVehicleType, vehicleConfigOptions) => ({
   type: SELECT_MODEL,
   selectedVehicleModelPath,
   selectedVehicleImagePath,
   selectedVehicleType,
   vehicleConfigOptions
});

// Get Vehicles Model Data Action
export const getVehicles = () => ({
   type: GET_VEHICLES
});

// Get Registered Vehicles Brand
export const getBrands = () => ({
   type: GET_BRANDS
});

// Get Partials Model Data Action
export const getPartials = (selectedVehicleType) => ({
   type: GET_PARTIALS,
   selectedVehicleType: selectedVehicleType
});

// Get Logo Image Action
export const getLogo = () => ({
   type: GET_LOGO
});