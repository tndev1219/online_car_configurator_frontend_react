import {
   SELECT_BRAND,
   SELECT_MODEL,
   GET_VEHICLES_SUCCESS,
   GET_PARTIALS_SUCCESS
} from '../../actions/vehicle/vehicleTypes';

const initState = {
   selectedBrand: 'menu.abarth',
   selectedModel: '',
   selectedVehicleType: '',
   vehiclesData: [],
   bodyData: [
      {
         id: 1,
         label: 'Body 1',
         paths: [
            {
               imagePath: '',
               modelName: 'body 1.1',
               modelPath: '',
               modelType: 'body'
            },
            {
               imagePath: '',
               modelName: 'body 1.2',
               modelPath: '',
               modelType: 'body'
            }
         ]
      },
      {
         id: 2,
         label: 'Body 2',
         paths: [
            {
               imagePath: '',
               modelName: 'body 2.1',
               modelPath: '',
               modelType: 'body'
            },
            {
               imagePath: '',
               modelName: 'body 2.2',
               modelPath: '',
               modelType: 'body'
            }
         ]
      }
   ],
   wheelsData: [],
   tiresData: [],
   suspensionsData: [],
   shockData: [],
   frontbumperData: [],
   rearbumperData: [],
   fenderData: [],
   grilleData: [],
   headlightData: [],
   hoodData: [],
   bedcoverData: [],
   bedaccessoryData: [],
   additionallightData: [],
   hitchData: [],
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
   bodyColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'body'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'body'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'body'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'body'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'body'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'body'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'body'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'body'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'body'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'body'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'body'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'body'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'body'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'body'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'body'
      }
   ],
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
   ],
   shockColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'shock'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'shock'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'shock'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'shock'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'shock'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'shock'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'shock'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'shock'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'shock'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'shock'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'shock'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'shock'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'shock'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'shock'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'shock'
      }
   ],
   frontbumperColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'frontbumper'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'frontbumper'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'frontbumper'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'frontbumper'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'frontbumper'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'frontbumper'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'frontbumper'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'frontbumper'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'frontbumper'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'frontbumper'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'frontbumper'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'frontbumper'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'frontbumper'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'frontbumper'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'frontbumper'
      }
   ],
   rearbumperColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'rearbumper'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'rearbumper'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'rearbumper'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'rearbumper'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'rearbumper'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'rearbumper'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'rearbumper'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'rearbumper'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'rearbumper'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'rearbumper'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'rearbumper'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'rearbumper'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'rearbumper'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'rearbumper'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'rearbumper'
      }
   ],
   fenderColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'fender'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'fender'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'fender'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'fender'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'fender'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'fender'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'fender'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'fender'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'fender'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'fender'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'fender'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'fender'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'fender'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'fender'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'fender'
      }
   ],
   grilleColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'grille'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'grille'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'grille'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'grille'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'grille'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'grille'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'grille'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'grille'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'grille'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'grille'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'grille'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'grille'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'grille'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'grille'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'grille'
      }
   ],
   headlightColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'headlight'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'headlight'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'headlight'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'headlight'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'headlight'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'headlight'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'headlight'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'headlight'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'headlight'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'headlight'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'headlight'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'headlight'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'headlight'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'headlight'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'headlight'
      }
   ],
   hoodColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'hood'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'hood'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'hood'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'hood'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'hood'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'hood'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'hood'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'hood'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'hood'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'hood'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'hood'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'hood'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'hood'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'hood'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'hood'
      }
   ],
   bedcoverColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'bedcover'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'bedcover'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'bedcover'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'bedcover'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'bedcover'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'bedcover'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'bedcover'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'bedcover'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'bedcover'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'bedcover'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'bedcover'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'bedcover'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'bedcover'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'bedcover'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'bedcover'
      }
   ],
   bedaccessoryColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'bedaccessory'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'bedaccessory'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'bedaccessory'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'bedaccessory'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'bedaccessory'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'bedaccessory'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'bedaccessory'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'bedaccessory'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'bedaccessory'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'bedaccessory'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'bedaccessory'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'bedaccessory'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'bedaccessory'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'bedaccessory'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'bedaccessory'
      }
   ],
   additionallightColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'additionallight'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'additionallight'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'additionallight'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'additionallight'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'additionallight'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'additionallight'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'additionallight'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'additionallight'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'additionallight'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'additionallight'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'additionallight'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'additionallight'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'additionallight'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'additionallight'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'additionallight'
      }
   ],
   hitchColorData: [
      {
         id: 0,
         value: '#010101',
         colorName: 'Black',
         modelType: 'hitch'
      }, {
         id: 1,
         value: '#e5e5e5',
         colorName: 'Pure White',
         modelType: 'hitch'
      }, {
         id: 2,
         value: '#b5b5b5',
         colorName: 'Silver Leap',
         modelType: 'hitch'
      }, {
         id: 3,
         value: '#170e3e',
         colorName: 'Deep Blue',
         modelType: 'hitch'
      }, {
         id: 4,
         value: '#1f2267',
         colorName: 'Telefonica Blue',
         modelType: 'hitch'
      }, {
         id: 5,
         value: '#3654a9',
         colorName: 'Billiant Blue',
         modelType: 'hitch'
      }, {
         id: 6,
         value: '#536591',
         colorName: 'Periwinkle',
         modelType: 'hitch'
      }, {
         id: 7,
         value: '#1d3025',
         colorName: 'Racing Green',
         modelType: 'hitch'
      }, {
         id: 8,
         value: '#1d931a',
         colorName: 'Candy Lime Green',
         modelType: 'hitch'
      }, {
         id: 9,
         value: '#71301f',
         colorName: 'Dull Red',
         modelType: 'hitch'
      }, {
         id: 10,
         value: '#a91a15',
         colorName: 'Mica Red',
         modelType: 'hitch'
      }, {
         id: 11,
         value: '#5d422d',
         colorName: 'Red Brown',
         modelType: 'hitch'
      }, {
         id: 12,
         value: '#49595b',
         colorName: 'Gunship Grey',
         modelType: 'hitch'
      }, {
         id: 13,
         value: '#525252',
         colorName: 'Light Gun Metal',
         modelType: 'hitch'
      }, {
         id: 14,
         value: '#d86408',
         colorName: 'Orange',
         modelType: 'hitch'
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
            selectedModel: action.selectedModel,
            selectedVehicleType: action.selectedVehicleType
         };

      case GET_VEHICLES_SUCCESS:
         return {
            ...state,
            vehiclesData: action.payload
         };

      case GET_PARTIALS_SUCCESS:
         return {
            ...state,
            wheelsData           : action.payload.wheelsData,
            tiresData            : action.payload.tiresData,
            suspensionsData      : action.payload.suspensionsData,
            shockData            : action.payload.shockData,
            frontbumperData      : action.payload.frontbumperData,
            rearbumperData       : action.payload.rearbumperData,
            fenderData           : action.payload.fenderData,
            grilleData           : action.payload.grilleData,
            headlightData        : action.payload.headlightData,
            hoodData             : action.payload.hoodData,
            bedcoverData         : action.payload.bedcoverData,
            bedaccessoryData     : action.payload.bedaccessoryData,
            additionallightData  : action.payload.additionallightData,
            hitchData            : action.payload.hitchData
         };

      default:
         return state;
   }
};

export default vehicleReducer;