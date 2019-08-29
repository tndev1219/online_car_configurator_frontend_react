import React from 'react'

import { Helmet } from "react-helmet";
import { connect } from 'react-redux';

// Material UI
import { Button } from '@material-ui/core';

// Redux
import * as authActions from '../../store/actions/auth';
import * as appSettingActions from '../../store/actions/appSetting';

const Home = (props) => {
  const { logout } = props;
  return (
    <div className="iron-sign-in-page-wrap">
      <Helmet>
        <title>Car | Home</title>
      </Helmet>
      <div className="inner-container ">
        <h1>Home</h1>
        <Button onClick={e => logout()}>Logout</Button>
      </div>
    </div>
  )
}

const mapStateToProps = ( state ) => ({
  waiting: state.appSetting.waiting
})

const mapDispatchToProps = {
  logout: authActions.logout,
  wait: appSettingActions.wait
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
