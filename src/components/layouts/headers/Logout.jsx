/**
 * logout header widget
*/
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
// import { Link } from 'react-router-dom';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded';
// import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';

import * as authActions from '../../../store/actions/auth';

class Logout extends React.Component {
   state = {
      anchorEl: null,
      user: {
         url: require('../../../assets/avatars/profile.jpg'),
         alt: 'user'
      },
      menus: [
         // {
         //    id: 1,
         //    title: 'Profile',
         //    icon: <AccountCircleRoundedIcon />,
         //    path: '/account/profile'
         // },
         // {
         //    id: 2,
         //    title: 'Account',
         //    icon: <SettingsApplicationsRoundedIcon />,
         //    path: '/account/profile'
         // },
         // {
         //    id: 3,
         //    title: 'Message',
         //    icon: <EmailRoundedIcon />,
         //    path: '/account/profile'
         // },
         {
            id: 4,
            title: 'Logout',
            icon: <PowerSettingsNewRoundedIcon />,
            path: '/signin'
         }
      ]
   };

   //define function for open dropdown
   handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
   };

   //define function for close dropdown
   handleClose = () => {
      this.props.logout();
      this.setState({ anchorEl: null });
   };

   render() {
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
      const user = this.state.user;
      return (
         <div className='iron-logout-wrap'>
            <Avatar
               aria-owns={open ? 'menu-appbar' : null}
               aria-haspopup="true"
               onClick={this.handleMenu}
               className="icon-btn"
               alt={user.alt} src={user.url}
            >
            </Avatar>
            <Menu
               anchorEl={anchorEl}
               anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
               }}
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
               }}
               open={open}
               onClose={() => {
                  this.setState({ anchorEl: null });
               }}
               className="iron-dropdown test"
            >
               {this.state.menus.map((menu, index) => (
                  <MenuItem
                     key={index}
                     onClick={this.handleClose}
                     // to={menu.path}
                     // component={Link}
                  >
                     <i className="material-icons">{menu.icon}</i>
                     <span className="mb-0 ml-10">{menu.title}</span>
                  </MenuItem>
               ))}
            </Menu>
         </div>
      );
   }
}

const mapDispatchToProps = {
   logout: authActions.logout
}
 
export default connect(null, mapDispatchToProps)(Logout);