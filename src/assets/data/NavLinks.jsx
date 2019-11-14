/**
 *  header-menu and sidebar menu data
 */
import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CommuteRoundedIcon from '@material-ui/icons/CommuteRounded';

/* eslint-disable */
export default [
   {
      "menu_title": "menu.Home",
      "path": "/",
      "icon": <HomeRoundedIcon />,
      "child_routes": null
   },
   {
      "menu_title": "menu.vehicles",
      "path": "/vehicles",
      "icon": <CommuteRoundedIcon />,
      "mega": true,
      "type": "mega",
      "child_routes": {
         'menu.vehicles1': [
            {
               "path": "/vehicles",
               "menu_title": "menu.abarth",
               "brand_name": "menu.abarth",
               "brand_logo": 'abarth'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.acura",
            //    "brand_name" : "menu.acura",
            //    "brand_logo": 'acura'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.alfaromeo",
            //    "brand_name" : "menu.alfaromeo",
            //    "brand_logo": 'alfaromeo'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.alpina",
            //    "brand_name" : "menu.alpina",
            //    "brand_logo": 'alpina'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.astonmartin",
            //    "brand_name" : "menu.astonmartin",
            //    "brand_logo": 'astonmartin'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.audi",
               "brand_name": "menu.audi",
               "brand_logo": 'audi'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.bentley",
            //    "brand_name" : "menu.bentley",
            //    "brand_logo": 'bentley'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.bertone",
            //    "brand_name" : "menu.bertone",
            //    "brand_logo": 'bertone'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.bmw",
            //    "brand_name" : "menu.bmw",
            //    "brand_logo": 'bmw'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.bugatti",
            //    "brand_name" : "menu.bugatti",
            //    "brand_logo": 'bugatti'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.buick",
            //    "brand_name" : "menu.buick",
            //    "brand_logo": 'buick'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.byd",
            //    "brand_name" : "menu.byd",
            //    "brand_logo": 'byd'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.cadillac",
               "brand_name": "menu.cadillac",
               "brand_logo": 'cadillac'
            },
            {
               "path": "/vehicles",
               "menu_title": "menu.chevrolet",
               "brand_name": "menu.chevrolet",
               "brand_logo": 'chevrolet'
            }
         ],
         'menu.vehicles2': [
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.chrysler",
            //    "brand_name" : "menu.chrysler",
            //    "brand_logo": 'chrysler'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.daewoo",
            //    "brand_name" : "menu.daewoo",
            //    "brand_logo": 'daewoo'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.dodge",
               "brand_name": "menu.dodge",
               "brand_logo": 'dodge'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.faw",
            //    "brand_name" : "menu.faw",
            //    "brand_logo": 'faw'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.ferrari",
               "brand_name": "menu.ferrari",
               "brand_logo": 'ferrari'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.fiat",
            //    "brand_name" : "menu.fiat",
            //    "brand_logo": 'fiat'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.ford",
               "brand_name": "menu.ford",
               "brand_logo": 'ford'
            },
            {
               "path": "/vehicles",
               "menu_title": "menu.gmc",
               "brand_name": "menu.gmc",
               "brand_logo": 'gmc'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.honda",
            //    "brand_name" : "menu.honda",
            //    "brand_logo": 'honda'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.hyundai",
            //    "brand_name" : "menu.hyundai",
            //    "brand_logo": 'hyundai'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.infiniti",
            //    "brand_name" : "menu.infiniti",
            //    "brand_logo": 'infiniti'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.iveco",
            //    "brand_name" : "menu.iveco",
            //    "brand_logo": 'iveco'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.jaguar",
            //    "brand_name" : "menu.jaguar",
            //    "brand_logo": 'jaguar'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.jeep",
            //    "brand_name" : "menu.jeep",
            //    "brand_logo": 'jeep'
            // }
         ],
         'menu.vehicles3': [
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.kia",
            //    "brand_name" : "menu.kia",
            //    "brand_logo": 'kia'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.lamborghini",
               "brand_name": "menu.lamborghini",
               "brand_logo": 'lamborghini'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.lancia",
            //    "brand_name" : "menu.lancia",
            //    "brand_logo": 'lancia'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.landrover",
            //    "brand_name" : "menu.landrover",
            //    "brand_logo": 'landrover'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.lexus",
               "brand_name": "menu.lexus",
               "brand_logo": 'lexus'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.lincoln",
            //    "brand_name" : "menu.lincoln",
            //    "brand_logo": 'lincoln'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.lotus",
            //    "brand_name" : "menu.lotus",
            //    "brand_logo": 'lotus'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.luxgen",
            //    "brand_name" : "menu.luxgen",
            //    "brand_logo": 'luxgen'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.maserati",
            //    "brand_name" : "menu.maserati",
            //    "brand_logo": 'maserati'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.mazda",
            //    "brand_name" : "menu.mazda",
            //    "brand_logo": 'mazda'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.mercedes",
               "brand_name": "menu.mercedes",
               "brand_logo": 'mercedes'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.minibmw",
            //    "brand_name" : "menu.minibmw",
            //    "brand_logo": 'minibmw'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.mitsubishi",
            //    "brand_name" : "menu.mitsubishi",
            //    "brand_logo": 'mitsubishi'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.nissan",
               "brand_name": "menu.nissan",
               "brand_logo": 'nissan'
            }
         ],
         'menu.vehicles4': [
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.opel",
            //    "brand_name" : "menu.opel",
            //    "brand_logo": 'opel'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.porsche",
               "brand_name": "menu.porsche",
               "brand_logo": 'porsche'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.qoros",
            //    "brand_name" : "menu.qoros",
            //    "brand_logo": 'qoros'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.roewe",
            //    "brand_name" : "menu.roewe",
            //    "brand_logo": 'roewe'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.rollsroyce",
               "brand_name": "menu.rollsroyce",
               "brand_logo": 'rollsroyce'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.seat",
            //    "brand_name" : "menu.seat",
            //    "brand_logo": 'seat'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.suzuki",
            //    "brand_name" : "menu.suzuki",
            //    "brand_logo": 'suzuki'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.tata",
            //    "brand_name" : "menu.tata",
            //    "brand_logo": 'tata'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.tesla",
               "brand_name": "menu.tesla",
               "brand_logo": 'tesla'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.toyota",
            //    "brand_name" : "menu.toyota",
            //    "brand_logo": 'toyota'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.vauxhall",
            //    "brand_name" : "menu.vauxhall",
            //    "brand_logo": 'vauxhall'
            // },
            {
               "path": "/vehicles",
               "menu_title": "menu.volkswagen",
               "brand_name": "menu.volkswagen",
               "brand_logo": 'volkswagen'
            },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.wiesmann",
            //    "brand_name" : "menu.wiesmann",
            //    "brand_logo": 'wiesmann'
            // },
            // {
            //    "path": "/vehicles",
            //    "menu_title": "menu.wuling",
            //    "brand_name" : "menu.wuling",
            //    "brand_logo": 'wuling'
            // }
         ]
      }
   },
   {
      "menu_title": "menu.Home",
      "path": "/",
      "icon": <HomeRoundedIcon />,
      "child_routes": null
   },
   {
      "menu_title": "menu.Home",
      "path": "/",
      "icon": <HomeRoundedIcon />,
      "child_routes": null
   },
   {
      "menu_title": "menu.Home",
      "path": "/",
      "icon": <HomeRoundedIcon />,
      "child_routes": null
   },
   {
      "menu_title": "menu.Home",
      "path": "/",
      "icon": <HomeRoundedIcon />,
      "child_routes": null
   },
   {
      "menu_title": "menu.Home",
      "path": "/",
      "icon": <HomeRoundedIcon />,
      "child_routes": null
   }
]
