import React, { Component } from "react";
import { connect } from 'react-redux';
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHanlder/withErrorHandler";
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return (<Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />);
            })


        };
        return (
            <div>
                {orders}
            </div>
        );
    }
}
const mapStateToprops = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToprops = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToprops, mapDispatchToprops)(withErrorHandler(Orders, axios));