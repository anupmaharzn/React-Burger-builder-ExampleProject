import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
};
const INGREDINET_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //name as payload : then old yesma vako ko value  + 1 state.ingrendients[salad] vanyeko 0 ho ni
                    // ani yesle override garxa the copy we created
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDINET_PRICE[action.ingredientName]
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //name as payload : then old yesma vako ko value  + 1 state.ingrendients[salad] vanyeko 0 ho ni
                    // ani yesle override garxa the copy we created
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice + INGREDINET_PRICE[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: 2,

            }
        };
        case actionTypes.FETCH_INGREDIENT_FAILED:
            {
                return {
                    ...state,
                    error: true
                }
            }
        default:
            return state;
    };



};

export default reducer;