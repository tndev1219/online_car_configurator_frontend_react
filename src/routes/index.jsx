import React, { lazy, Suspense, Fragment } from 'react';

import { Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import { IntlProvider } from 'react-intl';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Loader from '../components/Loader/Loader';

// themes
import primaryTheme from '../themes/primaryTheme';

// Private route guard 
import PrivateRoute from '../components/PrivateRoute';

//layout 
import HeaderOne from "../components/layouts/headers/HeaderOne";

// App locale
import AppLocale from '../lang';

// Public component
const Signin = lazy(() => import('../views/auth/signin'));
const Signup = lazy(() => import('../views/auth/signup'));
const ForgotPassword = lazy(() => import('../views/auth/forgot-password'));
const ResetPassword = lazy(() => import('../views/auth/reset-password'));
const PageNotFound = lazy(() => import('../views/page-404'));
const Home = lazy(() => import('../views/home'));
const Vehicle = lazy(() => import('../views/vehicle'));
const Vehicles = lazy(() => import('../views/vehicles'));
const Config = lazy(() => import('../views/config'));

const PUBLIC_ROUTES = [
   {
      component: Signin,
      url: '/signin',
      exact: true
   },
   {
      component: Signup,
      url: '/signup',
      exact: true
   },
   {
      component: ForgotPassword,
      url: '/forgot-password',
      exact: true
   },
   {
      component: ResetPassword,
      url: '/reset-password/:token',
      exact: true
   },
   {
      component: Home,
      url: '/',
      exact: true
   },
   {
      component: Home,
      url: '/home',
      exact: true
   },
   {
      component: Vehicles,
      url: '/vehicles',
      exact: true
   },
   {
      component: Vehicle,
      url: '/vehicle',
      exact: true
   },
   {
      component: Config,
      url: '/config',
      exact: true
   },
   {
      component: PageNotFound,
      url: '*',
      exact: false
   }
];

const PRIVATE_ROUTES = [
];

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display:flex;
  align-items: center;
  justify-content: center;
`;

const Routes = (props) => {
   const render_public_route = [];
   const render_private_route = [];

   const { location } = props;
   const currentAppLocale = AppLocale['en'];

   PUBLIC_ROUTES.map((route, key) =>
      render_public_route.push(<Route path={route.url} key={route.url + key} component={route.component} exact={route.exact} />)
   );

   PRIVATE_ROUTES.map((route, key) =>
      render_private_route.push(<PrivateRoute path={route.url} key={route.url + key} component={route.component} exact={route.exact} />)
   );

   const getUrl = (pathname) => {
      let pathArray = pathname.split('/');
      return `/${pathArray[1]}` === '/config' ? true : false;
   };

   return (
      <MuiThemeProvider theme={primaryTheme}>
         <IntlProvider
            textComponent="span"
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
         >
            <Fragment>
               <div className="app-container">
                  {!getUrl(location.pathname) &&
                     <Fragment>
                        <HeaderOne history={props.history} />
                     </Fragment>
                  }
                  <Suspense fallback={<LoaderWrapper><Loader /></LoaderWrapper>}>
                     <Switch>
                        {render_public_route}
                        {render_private_route}
                     </Switch>
                  </Suspense>
               </div>
            </Fragment>
         </IntlProvider>
      </MuiThemeProvider>
   );
}

export default Routes;