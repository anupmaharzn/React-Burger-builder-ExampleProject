import React, { Component } from "react";
import { connect } from 'react-redux';
import CheckoutSummery from "../../components/Order/CheckoutSummery/CheckoutSummery";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
    state = {

    }
    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1'] 
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];
    //         }


    //     };
    //     this.setState({
    //         ingredients: ingredients,
    //         totalprice: price
    //     })
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {

        const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
        return (

            <div>
                {purchasedRedirect}
                < CheckoutSummery
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div >
        );
    }
}

const mapStateToprops = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,

    }
}

export default connect(mapStateToprops)(Checkout);