import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { User } from '../../dummy_datas/User.jsx';
import { FiPlus } from "react-icons/fi";
import { TopNavlink as EnglishNavlink } from '../../../lang/en/MenuTitleDatas.jsx';
import { TopNavlink as TamilNavlink } from '../../../lang/tam/MenuTitleDatas.jsx';
import { TopNavSublink as EnglishNavSublink } from '../../../lang/en/MenuTitleDatas.jsx';
import { TopNavSublink as TamilNavSublink } from '../../../lang/tam/MenuTitleDatas.jsx';

import './NavLinks.css';

let TopNavlink;
let TopNavSublink;

if (User.lang_id == 1) {
  TopNavlink = EnglishNavlink;
  TopNavSublink = EnglishNavSublink;
} else if (User.lang_id == 2) {
  TopNavlink = TamilNavlink;
  TopNavSublink = TamilNavSublink;
}

const NavLinks = props => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    // Uncomment the next line if you want the dropdown to close on mouse leave
    // setDropdownVisible(false);
  };

  const handleOptionClick = () => {
    setDropdownVisible(false);
  };

  return (
    <ul className="nav-links">
        {
    TopNavlink.map((nav) => {
      return(
      <li>
        <div className="menu-dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <NavLink 
        className='main-navlink' 
        to={`${nav.link}`} 
        exact 
>
          <div className="flex items-center">
            {nav.icon}<span className='ml-2'>{nav.title}</span>
          </div>
        </NavLink>
        {isDropdownVisible && (
        <div className="menu-dropdown-content ">
          {/* Your dropdown content goes here */}
          {TopNavSublink[nav.id] && (TopNavSublink[nav.id].map((sub) => (
                  <NavLink className={`flex justify-between items-center sub-navlink text-sky-700 ${location.pathname === sub.add_link ? 'active' : ''}`} to={`${sub.link}`} onClick={handleOptionClick} exact>
                    <div className="flex items-center">
                      {sub.icon}<span className='ml-2'>{sub.title}</span>
                    </div>
                    <div className="text-right">
                      <Link to={`${sub.add_link}`} className='relative hover:text-sky-400 text-lg'>
                        <FiPlus className='plus-icon'/>
                      </Link>
                    </div>
                  </NavLink>
                )
              ))}
        </div>
      )}
      </div>
      </li>
      )
      })}
    </ul>
  );
};

export default NavLinks;
