import React from "react";
import styles from './Burger.module.css';
import BurgerIngredient from "./Burgeringredient/BurgerIngredient";
const burger = (props) => {
    //yesle chai based on value how many times ? key lie chahi render garxa ta 
    //Buger builder bata chai object aako xa tesko key matra use garna lie Object.keys
    //then it returns array of keys so we can map it now 
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // console.log(igKey);
            //tranforming into each individual ingredient array base on its value
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                //console.log(props.ingredients[igKey]);
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    //console.log(transformedIngredients);
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;