import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import styles from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            district: ''
        },
        loading: false

    }
    orderHandler = (event) => {
        //sending request of form element stop garna we need this 
        event.preventDefault();
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            //inreal app price is calculated in backend coz user can manipulated the data noted:
            price: this.props.price,
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

                });
                this.props.history.push('/');
            }).catch(error => {
                this.setState({
                    loading: false,

                })
            });

    }
    render() {
        let form = (
            <form>
                <input type='text' name='name' placeholder='your name' />
                <input type='email' name='email' placeholder='your email' />
                <input type='text' name='street' placeholder=' Street' />
                <input type='text' name='district' placeholder='Postal Code' />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Delivery Data</h4>
                {form}
            </div>
        );
    }
}


export default ContactData;