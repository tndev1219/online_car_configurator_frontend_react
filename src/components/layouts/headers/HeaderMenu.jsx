/* eslint-disable */
/**
 * Header menu component
 */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from "classnames";
import { connect } from 'react-redux';

import * as vehicleActions from '../../../store/actions/vehicle';

// intl messages
import IntlMessages from '../../../utils/IntlMessages';

// nav links
import navLinks from '../../../assets/data/NavLinks';

function HeaderMenu(props) {
   return (
      <div className="horizontal-menu">
         <ul className="d-inline-block iron-header-menu mb-0">
            {navLinks.map((navLink, index) => {
               if (navLink.child_routes && navLink.child_routes != null) {
                  return (
                     <li key={index} className={classnames({ 'mega-menu': navLink.mega })}>
                        <Link to={navLink.path}>
                           <IntlMessages id={navLink.menu_title} />
                        </Link>
                        {(navLink.type && navLink.type === 'subMenu') ?
                           <Fragment>
                              {navLink.child_routes !== null &&
                                 <ul className="sub-menu mb-0">
                                    {navLink.child_routes && navLink.child_routes.map((subNavLink, index) => (
                                       <Fragment key={index}>
                                          {subNavLink.child_routes !== null ?
                                             <li >
                                                <a href="/" className="d-flex justify-content-between align-items-center">
                                                   <IntlMessages id={subNavLink.menu_title} />
                                                   <i className="material-icons">keyboard_arrow_right</i>
                                                </a>
                                                <ul className="sub-menu-child mb-0">
                                                   {subNavLink.child_routes.map((subMenuItem, index) => (
                                                      <li key={index}>
                                                         <Link to={subMenuItem.path}>
                                                            <IntlMessages id={subMenuItem.menu_title} />
                                                         </Link>
                                                      </li>
                                                   ))}
                                                </ul>
                                             </li>
                                             :
                                             < li>
                                                <Link to={subNavLink.path}>
                                                   <IntlMessages id={subNavLink.menu_title} />
                                                </Link>
                                             </li>
                                          }
                                       </Fragment>
                                    ))}
                                 </ul>
                              }
                           </Fragment>
                           :
                           <Fragment>
                              {navLink.child_routes !== null &&
                                 <ul className="sub-menu mb-0 d-flex">
                                    {navLink.child_routes && Object.keys(navLink.child_routes).map((subNavLink, index) => (
                                       <li key={index}>
                                          {/* <a href="javascript:void(0)"><IntlMessages id={subNavLink} /></a> */}
                                          <ul className="mb-0">
                                             {navLink.child_routes[subNavLink].map((megaMenuItem, index) => (
                                                <li key={index}>
                                                   <Link to={megaMenuItem.path} className="text-capitalize brand-hover" onClick={() => {props.selectBrand(megaMenuItem.brand_name)}}>
                                                      <img 
                                                         src={require(`../../../assets/images/brands/${megaMenuItem.brand_logo}.png`)} 
                                                         alt='brand-logo' 
                                                         className="mr-10" 
                                                         width='40'
                                                      />
                                                      <IntlMessages id={megaMenuItem.menu_title} />
                                                   </Link>
                                                </li>
                                             ))}
                                          </ul>
                                       </li>
                                    ))}
                                 </ul>
                              }
                           </Fragment>
                        }
                     </li>
                  )
               }
               return (
                  <li key={index}>
                     <Link to={navLink.path}><IntlMessages id={navLink.menu_title} /></Link>
                  </li>
               )
            })}
         </ul>
      </div>
   );
}

const mapDispatchToProps = {
   selectBrand: vehicleActions.selectBrand
 }
 
 export default connect(null, mapDispatchToProps)(HeaderMenu);
