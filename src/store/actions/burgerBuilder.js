import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

//fetching ingredient async
//sync yo chai reducer maa import hunxa
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
//sync yo pani reducer maa import hunxa
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}
//asyn code , yo chai container bata dispatch hunxa
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-app-18fae-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            }).catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    };
}