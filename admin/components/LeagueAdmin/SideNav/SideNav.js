import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import './styles.css';


const SideNav = ({league}) => {
   return (
     <div>
       <ul className='list-group'>
         <li className='list-group-item nopadding'>
           <Link to={"/" + league.name + "/admin/league/config"} className='list-group-item'>
             <span className='inline-list-item side-nav-item'>
             Configuration
             </span>
           </Link>
         </li>
         <li className="list-group-item nopadding">
           <Link to={"/" + league.name + "/admin/league"} className='list-group-item'>
             <span className='inline-list-item side-nav-item'>
               Update League
             </span>

           </Link>
         </li>
         <li className="list-group-item nopadding">
           <Link to={"/" + league.name + "/admin/league/info"} className="list-group-item">
             <span className='inline-list-item side-nav-item'>
               Update Information
             </span>
           </Link>
         </li>
         <li className="list-group-item nopadding">
           <Link to={"/" + league.name + "/admin/league/info"}  className="list-group-item">
             <span className='inline-list-item side-nav-item'>
               Update Rules
             </span>
           </Link>
         </li>
       </ul>
     </div>
   );
}

export default SideNav;

