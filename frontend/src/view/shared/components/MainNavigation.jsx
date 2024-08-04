import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import NavLinks from './NavLinks';
import SideLinks from './SideLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import { BiMenu } from 'react-icons/bi';
import './MainNavigation.css';


const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <SideLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <BiMenu className="icons"/>
        </button>
        <h1 className="main-navigation__title text-left pl-5">
          <Link className="text-xl font-bold" to="/">Storage Software</Link>
        </h1>
        <nav className="main-navigation__header-nav pl-12">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
