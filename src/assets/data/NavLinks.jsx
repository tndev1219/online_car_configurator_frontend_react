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
      "path": "#",
      "icon": <CommuteRoundedIcon />,
      "mega": true,
      "type": "mega",
      "child_routes": {
         'menu.vehicles1': [],
         'menu.vehicles2': [],
         'menu.vehicles3': [],
         'menu.vehicles4': []
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
