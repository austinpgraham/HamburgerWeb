import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';      
import { StripeProvider,
         Elements } from 'react-stripe-elements';
import PaymentForm from './PaymentForm';


const styles = {

}

const STRIP_PUBLIC_KEY = "pk_test_LrE9OQtwmyG8OLZfj32h8FJR";

class PaymentDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StripeProvider apiKey={STRIP_PUBLIC_KEY}>
                <Elements>
                     <PaymentForm {...this.props}/>
                </Elements>
            </StripeProvider>
        );
    }
}

export default withStyles(styles)(PaymentDialog);
