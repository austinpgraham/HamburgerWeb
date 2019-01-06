import React, { Component } from 'react';
import { withStyles, Grid, CircularProgress } from '@material-ui/core/';
import { ROOT } from '../constants';
import { Title, Product } from '../components/display';
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
                      uid: this.props.uid};
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
        for(var p in this.state.products) {
            var newItem = <Grid item xs={3} key={p.title}><Product
                                                                price={this.state.products[p].price}
                                                                donations={this.state.products[p].total_donations}
                                                                image={this.state.products[p].imageURL}
                                                                link={this.state.products[p].itemURL}
                                                           >
                                                                {this.state.products[p].title}
                                                           </Product></Grid>
            products.push(newItem);
        }
        return (products.length === 0) ? <Title>No Products in List</Title> : products;
    }

    componentDidMount() {
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

    render() {
        return(
            <div>
                {this.renderLoading()}
            </div>
        );
    }
}

export default withStyles(styles)(ListForm);
