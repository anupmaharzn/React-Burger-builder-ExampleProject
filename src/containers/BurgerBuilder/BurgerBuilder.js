import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHanlder/withErrorHandler';
import axios from '../../axios-order';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    //   constructor(props){
    //       super(props);
    //       this.state ={...}
    //   } OR
    state = {
        //ingredients from backend
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        // we will learn paxi when handling async in reducer

        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data,
        //         })
        //     }).catch(error => {
        //         this.setState({
        //             error: true,
        //         })
        //     });

    }

    updatepurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        //return true or false
        return sum > 0;


    }
    // dont need that reducer maa vaisakyo

    // addIngredientHandler = (type) => {

    //     //ingredient add
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };//simple copy of state immute garnu parxa
    //     updatedIngredients[type] = updatedCount;

    //     //price
    //     const priceAddition = INGREDINET_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     //state
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });

    //     this.updatepurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) { return; }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     //price
    //     const priceDeduction = INGREDINET_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatepurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    };
    purchaseContinueHandler = () => {

        //we do this in redux


        // const queryParams = [];

        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }

        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        });
    };
    render() {

        const disabledInfo = { ...this.props.ings };

        let orderSummary = null;
        let burger = this.state.error ? <p>ingredient cant be loaded</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientremoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatepurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Aux>

            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToprops = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}
const mapDispatchToprops = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}
//witherrohandler is HOC WRAPPER
export default connect(mapStateToprops, mapDispatchToprops)(withErrorHandler(BurgerBuilder, axios));