import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles, CircularProgress, Grid } from '@material-ui/core';
import { NavBar } from '../components/display';
import { ROOT } from '../constants';
import axios from 'axios';
import HomeForm from './HomeForm';
import SearchForm from './SearchForm';
import ListForm from './ListForm';

const AuthURL = ROOT + "/auth";

const styles = {

};

class MyForm extends Component {
    constructor(props) {
        super(props);
        
        var uid = this.props.match.params.uid;
        this.state = {currentForm: "Home", 
                      redirectTo: null,
                      isLoading: true,
                      uid: uid,
                      query: null,
                      productID: null};
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }

    componentDidMount() {
        axios.get(AuthURL, {withCredentials: true}).then((response) => {
            this.setState({authID: response.data.username, isLoading: false});
        });
    }

    componentDidUpdate() {
        var {uid, query, listid} = this.props.match.params;
        var newForm = null;
        if(listid != null) {
            newForm = "Wishlist";
        } else if (query != null) {
            newForm = "Search";
        } else if (uid != null) {
            newForm = "Home";
        }
        if(this.state.currentForm !== newForm ||
           this.state.query !== query ||
           this.state.uid !== uid ||
           this.state.productID !== listid) {
               this.setState({
                   currentForm: newForm,
                   query: query,
                   uid: uid,
                   productID: listid
               });
           }
    }

    renderRedirect() {
        if(this.state.redirectTo !== null) {
            return <Redirect to={this.state.redirectTo} />
        }
        return null
    }

    renderLoading() {
        if(this.state.isLoading || this.state.authID === null) {
            return <CircularProgress size={30} />
        }
        var formToLoad = null;
        switch(this.state.currentForm) {
            case "Home":
                formToLoad = <HomeForm 
                                authID={this.state.authID}
                                uid={this.state.uid}
                                />;
                break;
            case "Search":
                formToLoad = <SearchForm
                                authID={this.state.authID}
                                query={this.state.query}
                             />
                break;
            case "Wishlist":
                formToLoad = <ListForm
                                authID={this.state.authID}
                                productID={this.state.productID}
                                uid={this.state.uid}
                             />
                break;
            default:
                break;
        }
        return (
            <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <NavBar fullWidth={true} 
                                authID={this.state.authID} 
                                title={this.state.currentForm}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {formToLoad}
                    </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                {this.renderLoading()}
            </div>
        );
    }
}

export default withStyles(styles)(MyForm);
