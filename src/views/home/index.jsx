import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

import * as authActions from '../../store/actions/auth';

const Home = (props) => {

  return (
    <Fragment>
      <Helmet>
         <title>Car | Home</title>
      </Helmet>
      <div className="iron-home-wrap">
        {/* <div className="container"> */}
          <img src={require('../../assets/images/bg-home.jpg')} alt="bg-home" style={{width: '100%'}}></img>
        {/* </div> */}
      </div>
    </Fragment>
  );
}

const mapDispatchToProps = {
  logout: authActions.logout
}

export default connect(null, mapDispatchToProps)(Home);