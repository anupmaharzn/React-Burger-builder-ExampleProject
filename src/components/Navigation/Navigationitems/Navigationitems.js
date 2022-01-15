import React from 'react';
import Navigationitem from './Navigationitem/Navigationitem';
import styles from './Navigationitems.module.css';
const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <Navigationitem link='/' exact >Burger builder</Navigationitem>
        <Navigationitem link='/orders'>Orders</Navigationitem>
    </ul>

);

export default navigationItems;