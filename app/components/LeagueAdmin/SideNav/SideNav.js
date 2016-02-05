import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import './styles.css';


 const SideNav = ({league}) => {
   
   return (
     <div style={{padding: "10px"}}>
       <ul className="list-group">
         <li className="list-group-item">
           <Link to={"/" + league.name + "/admin/league/config"}>
             Configuration
           </Link>
         </li>
         <li className="list-group-item">
           <Link to={"/" + league.name + "/admin/league"}>
             Update League
           </Link>
         </li>
         <li className="list-group-item">
           <Link to={"/" + league.name + "/admin/league/info"}>
             Update Information
           </Link>
         </li>
         <li className="list-group-item">
           <Link to={"/" + league.name + "/admin/league/info"}>
             Update Rules
           </Link>
         </li>
       </ul>
     </div>
   );
 }

export default SideNav;

