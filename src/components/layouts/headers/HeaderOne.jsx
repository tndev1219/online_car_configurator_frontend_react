/**
 * site header one component
 */
/* eslint-disable */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';

// components
import FixedHeader from '../headers/FixedHeader';

const areEqual = (prevProps, nextProps) => true;

const HeaderOne = (props) => {
   return (
      <div>
         <AppBar position="static" className={`iron-header-wrapper bg-primary iron-header-v1 header-fixed`}>
            <FixedHeader history={props.history} />
         </AppBar>
      </div>
   );
};

export default React.memo((HeaderOne), areEqual);