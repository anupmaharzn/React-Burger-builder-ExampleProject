import React, { Component } from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextprops, nextstate) {
        return nextprops.show !== this.props.show || nextprops.children !== this.props.children; //return true or false
    }
    componentWillUpdate() {
        console.log('[Modal] willupdate');
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-300vh)'
                    }}>
                    {this.props.children}
                </div>

            </Aux>
        )
    };
}
export default Modal;