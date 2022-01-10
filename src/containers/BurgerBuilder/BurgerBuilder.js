import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHanlder/withErrorHandler';
import axios from '../../axios-order';

const INGREDINET_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    //   constructor(props){
    //       super(props);
    //       this.state ={...}
    //   } OR
    state = {
        //ingredients from backend
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data,
                })
            }).catch(error => {
                this.setState({
                    error: true,
                })
            });

    }

    updatepurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        })

    }

    addIngredientHandler = (type) => {

        //ingredient add
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };//simple copy of state immute garnu parxa
        updatedIngredients[type] = updatedCount;

        //price
        const priceAddition = INGREDINET_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        //state
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatepurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) { return; }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        //price
        const priceDeduction = INGREDINET_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatepurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            //inreal app price is calculated in backend coz user can manipulated the data noted:
            price: this.state.totalPrice,
            customer: {
                name: "Anup Maharjan",
                address: {
                    street: "test123",
                    district: 'lalittest'
                },
                email: 'test123@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            }).catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            });
    };
    render() {

        const disabledInfo = { ...this.state.ingredients };

        let orderSummary = null;
        let burger = this.state.error ? <p>ingredient cant be loaded</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientremoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Aux>

            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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
//HOC Wapper
export default withErrorHandler(BurgerBuilder, axios);