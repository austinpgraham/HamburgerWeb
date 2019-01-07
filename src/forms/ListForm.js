import React, { Component } from 'react';
import { withStyles,
         Grid, 
         CircularProgress,
         Button } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { ROOT } from '../constants';
import { Title, Product } from '../components/display';
import { AddProductDialog, PaymentDialog } from '../components/dialogs';
import axios from 'axios';

const WishlistURL = ROOT + "/users/_u/_p";

const styles = {

}

class ListForm extends Component {
    constructor(props) {
        super(props);

        this.state = {productID: this.props.productID,
                      authID: this.props.authID,
                      products: null,
                      isLoading: true,
                      uid: this.props.uid,
                      addDialogVisible: false,
                      donateDialogVisible: false,
                      donateList: null,
                      donateProduct: null};
        this.renderLoading = this.renderLoading.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
    }

    renderLoading() {
        if(this.state.isLoading) {
            return <CircularProgress size={30} />
        }
        return this.renderProducts();
    }

    renderProducts() {
        var products = [];
        if(this.state.authID === this.state.uid) {
            var createButton = this.renderAddProductButton();
            products.push(createButton);
        }
        for(var p in this.state.products) {
            var newItem = <Grid item xs={4} key={p.title}><Product
                                                                price={this.state.products[p].price}
                                                                donations={this.state.products[p].total_donations}
                                                                image={this.state.products[p].imageURL}
                                                                link={this.state.products[p].itemURL}
                                                                openDonateHandler={this.openPaymentForm}
                                                                listID={this.state.productID}
                                                                pid={this.state.products[p].hamid}
                                                           >
                                                                {this.state.products[p].title}
                                                           </Product></Grid>
            products.push(newItem);
        }
        if(products.length <= 1) {
            products.push(<Title>No Products in List</Title>);
        }
        return products;
    }

    addProduct = () => {
        this.setState({addDialogVisible: true});
    }

    renderAddProductButton = () => {
        return (
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={this.addProduct}>
                    <AddIcon />
                    Add Product
                </Button>
            </Grid>
        );
    }

    closeAddForm = () => {
        this.setState({addDialogVisible: false});
        this.updateList();
    }

    openPaymentForm = (listID, pid) => {
        this.setState({donateDialogVisible: true, donateList: listID, donateProduct: pid});
    }

    closePaymentForm = () => {
        this.setState({donateDialogVisible: false, donateList: null, donateProduct: null});
    }

    updateList = () => {
        var listURL = WishlistURL.replace("_u", this.state.uid);
        listURL = listURL.replace("_p", this.state.productID);
        axios.get(listURL, { withCredentials: true }).then((response) => {
            var items = response.data.items;
            if(Object.keys(items).length <= 0) {
                this.setState({isLoading: false});
            } else {
                var products = [];
                for(var item in items) {
                    products.push(items[item]);
                }
                this.setState({isLoading: false, products: products});
            }
        });
    }

    componentDidMount() {
        this.updateList();
    }

    renderPaymentForm = () => {
        if(!this.state.donateDialogVisible) {
            return null;
        }
        return (
            <PaymentDialog
                onCloseHandler={this.closePaymentForm}
                listID={this.state.donateList}
                isVisible={true}
                authID={this.state.authID}
                productID={this.state.donateProduct}
            />
        );
    }

    render() {
        return(
            <div>
                <Grid container xs={24}>
                    {this.renderLoading()}
                </Grid>
                <AddProductDialog
                    authID={this.state.authID}
                    isVisible={this.state.addDialogVisible}
                    onCloseHandler={this.closeAddForm}
                    listid={this.state.productID}
                />
                {this.renderPaymentForm()}
            </div>
        );
    }
}

export default withStyles(styles)(ListForm);
