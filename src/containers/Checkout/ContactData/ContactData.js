import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import styles from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input';
class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false

            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            district: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'district'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    }
                    ]
                },
                value: 'Fastest',
                validation: {},
                valid: true
            },
        },
        formIsvalid: false,

        loading: false

    }

    //return true or false
    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== ' ' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, inputidentifier) => {
        //console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedformElement = { ...updatedOrderForm[inputidentifier] }

        updatedformElement.value = event.target.value;
        updatedformElement.valid = this.checkValidity(updatedformElement.value, updatedformElement.validation);


        updatedformElement.touched = true;
        updatedOrderForm[inputidentifier] = updatedformElement;

        let formIsvalid = true;

        for (let inputidentifier in updatedOrderForm) {
            formIsvalid = updatedOrderForm[inputidentifier] && formIsvalid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsvalid: formIsvalid
        })
    };

    orderHandler = (event) => {
        //sending request of form element stop garna we need this 
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; //key:value
        }
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ings,
            //inreal app price is calculated in backend coz user can manipulated the data noted:
            price: this.props.price,
            orderData: formData
        }
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
        const fromElementArray = [];
        for (let key in this.state.orderForm) {
            fromElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>

                {fromElementArray.map(fromElement => (
                    <Input
                        key={fromElement.id}
                        elementType={fromElement.config.elementType}
                        elementConfig={fromElement.config.elementConfig}
                        value={fromElement.config.value}
                        invalid={!fromElement.config.valid}
                        shouldValidate={fromElement.config.validation}
                        touched={fromElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, fromElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsvalid}>ORDER</Button>
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

const mapStateToprops = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToprops)(ContactData);