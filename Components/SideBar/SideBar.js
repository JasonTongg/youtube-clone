import React from 'react';
import Styles from './SideBar.module.css';
import {RxHamburgerMenu} from 'react-icons/rx';
import {AiFillHome} from 'react-icons/ai';

export default function SideBar() {
  return (
    <div className={Styles.container}>
      <div className={Styles.items}>
        <RxHamburgerMenu></RxHamburgerMenu>
      </div>
      <div className={`${Styles.item} ${Styles.active}`}>
        <AiFillHome></AiFillHome>
        <p>Home</p>
      </div>
    </div>
  );
}
