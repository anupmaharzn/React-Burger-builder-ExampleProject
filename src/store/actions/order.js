import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerstart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,

    }
}

//async
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerstart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))

            }).catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETECH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETECH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETECH_ORDERS_START,
    }
};

//async
export const fetchOrders = () => {

    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            }).catch(err => {

                dispatch(fetchOrderFail(err));
            });
    }

}