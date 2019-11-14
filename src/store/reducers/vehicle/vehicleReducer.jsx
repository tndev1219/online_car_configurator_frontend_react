import {
   SELECT_BRAND,
   SELECT_MODEL,
   GET_VEHICLES_SUCCESS,
   GET_PARTIALS_SUCCESS
} from '../../actions/vehicle/vehicleTypes';

const initState = {
   selectedBrand: 'menu.abarth',
   selectedModel: '',
   vehiclesData: [],
   wheelsData: [],
   tiresData: [
      {
         modelType: 'tire',
         imagePath: 'http://localhost:4001/viewer3D/img/tires/tire_1.jpg',
         modelPath: 'viewer3D/models/partials/tires/tire_1.zip',
         modelName: 'Tire 1',
         modelMinSize: 33
      }, {
         modelType: 'tire',
         imagePath: 'http://localhost:4001/viewer3D/img/tires/tire_2.jpg',
         modelPath: 'viewer3D/models/partials/tires/tire_2.zip',
         modelName: 'Tire 2',
         modelMinSize: 28
      }, {
         modelType: 'tire',
         imagePath: 'http://localhost:4001/viewer3D/img/tires/tire_3.jpg',
         modelPath: 'viewer3D/models/partials/tires/tire_3.zip',
         modelName: 'Tire 3',
         modelMinSize: 34
      }, {
         modelType: 'tire',
         imagePath: 'http://localhost:4001/viewer3D/img/tires/tire_4.jpg',
         modelPath: 'viewer3D/models/partials/tires/tire_4.zip',
         modelName: 'Tire 4',
         modelMinSize: 29
      }, {
         modelType: 'tire',
         imagePath: 'http://localhost:4001/viewer3D/img/tires/tire_5.jpg',
         modelPath: 'viewer3D/models/partials/tires/tire_5.zip',
         modelName: 'Tire 5',
         modelMinSize: 31
      }, {
         modelType: 'tire',
         imagePath: 'http://localhost:4001/viewer3D/img/tires/tire_6.jpg',
         modelPath: 'viewer3D/models/partials/tires/tire_6.zip',
         modelName: 'Tire 6',
         modelMinSize: 32
      }
   ],
   suspensionsData: [
      {
         modelType: 'suspension',
         imagePath: 'http://localhost:4001/viewer3D/img/suspensions/suspension_1.jpg',
         modelPath: 'viewer3D/models/partials/suspensions/suspension_1.zip',
         modelName: 'Suspension 1'
      }
   ],
   wheelsDiametersData: [
      {
         id: 0,
         label: 22
      }, {
         id: 1,
         label: 24
      }, {
         id: 2,
         label: 26
      }, {
         id: 3,
         label: 28
      }, {
         id: 4,
         label: 30
      }
   ],
   wheelsWidthsData: {
      0: [{ id: 0, label: 12 }, { id: 1, label: 14 }],
      1: [{ id: 0, label: 12 }, { id: 1, label: 14 }, { id: 2, label: 16 }],
      2: [{ id: 0, label: 14 }, { id: 1, label: 16 }],
      3: [{ id: 0, label: 16 }],
      4: [{ id: 0, label: 16 }],
   },
   wheelsColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'wheel'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'wheel'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'wheel'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'wheel'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'wheel'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'wheel'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'wheel'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'wheel'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'wheel'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'wheel'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'wheel'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'wheel'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'wheel'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'wheel'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'wheel'
      }
   ],
   suspensionsColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'suspension'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'suspension'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'suspension'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'suspension'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'suspension'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'suspension'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'suspension'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'suspension'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'suspension'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'suspension'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'suspension'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'suspension'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'suspension'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'suspension'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'suspension'
      }
   ]
};

const vehicleReducer = (state = initState, action) => {
   switch (action.type) {
      case SELECT_BRAND:
         return {
            ...state,
            selectedBrand: action.selectedBrand
         };

      case SELECT_MODEL:
         return {
            ...state,
            selectedModel: action.selectedModel
         };

      case GET_VEHICLES_SUCCESS:
         return {
            ...state,
            vehiclesData: action.payload
         };

      case GET_PARTIALS_SUCCESS:
         return {
            ...state,
            wheelsData: action.payload.wheelsData
         };

      default:
         return state;
   }
};

export default vehicleReducer;