import React, { Component } from 'react';
import { injectStripe,
         CardNumberElement,
         CardExpiryElement,
         PostalCodeElement } from 'react-stripe-elements';
import { Dialog, 
         DialogContent,
         DialogActions,
         DialogTitle,
         Button,
         Grid,
         TextField,
         CircularProgress } from '@material-ui/core';
import { ROOT } from '../../constants';
import axios from 'axios';

class PaymentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: null,
            last_name: null,
            amount: 0.0,
            allDisable: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onFirstChange = e => {
        this.setState({first_name: e.target.value});
    }

    onLastChange = e => {
        this.setState({last_name: e.target.value});
    }

    onAmountChange = e => {
        this.setState({amount: e.target.value});
    }

    renderLoading = () => {
        if(this.state.isLoading) {
            return <CircularProgress size={30} />
        }
        return null;
    }

    handleSubmit = eb => {
        this.setState({isLoading: true, allDisable: true});
        var name = this.state.first_name + " " + this.state.last_name;
        this.props.stripe.createToken({name: name}).then((token) => {
            let url = ROOT + "/users/"+this.props.authID+"/"+this.props.listID+"/"+this.props.productID;
            axios.post(url, {'amount': parseFloat(this.state.amount), 'token': token.id}, {withCredentials: true}).then((response) => {
                this.props.onCloseHandler();
            });
        });
    }

    render() {
        return (
            <Dialog open={this.props.isVisible} aria-labelledby="payment-form">
                <DialogTitle id="payment-form">{"Donate to "+this.props.listID}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="first"
                                label="First Name"
                                placeholder="First Name"
                                variant="outlined"
                                fullWidth={true}
                                onChange={this.onFirstChange}
                                value={this.state.first_name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="last"
                                label="Last Name"
                                placeholder="Last Name"
                                variant="outlined"
                                fullWidth={true}
                                onChange={this.onLastChange}
                                value={this.state.last_name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="last"
                                label="Amount"
                                placeholder="Amount"
                                variant="outlined"
                                fullWidth={true}
                                onChange={this.onAmountChange}
                                value={this.state.amount}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CardNumberElement />
                        </Grid>
                        <Grid item xs={12}>
                            <CardExpiryElement />
                        </Grid>
                        <Grid item xs={12}>
                            <PostalCodeElement />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {this.renderLoading()}
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    <Button color="primary" onClick={this.props.onCloseHandler}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default injectStripe(PaymentForm);
