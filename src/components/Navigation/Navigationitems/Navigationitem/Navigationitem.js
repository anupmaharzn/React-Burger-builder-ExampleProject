import React from "react";
import styles from './Navigationitem.module.css'

const navigationitem = (props) => (
    <li className={styles.NavigationItem}>
        <a href={props.link}
            className={props.active ? styles.active : null}>{props.children}</a>
    </li>
);

export default navigationitem;