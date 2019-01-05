import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles, CircularProgress, Grid } from '@material-ui/core';
import { NavBar } from '../components/display';
import { ROOT } from '../constants';
import axios from 'axios';
import HomeForm from './HomeForm';
import SearchForm from './SearchForm';

const AuthURL = ROOT + "/auth";

const styles = {

};

class MyForm extends Component {
    constructor(props) {
        super(props);
        
        var uid = this.props.match.params.uid;
        var query = this.props.match.params.query;
        this.state = {currentForm: (uid === null) ? "search" : "home", 
                      redirectTo: null,
                      isLoading: true,
                      uid: uid,
                      query: query};
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }

    componentDidMount() {
        axios.get(AuthURL, {withCredentials: true}).then((response) => {
            this.setState({authID: response.data.username, isLoading: false});
        });
    }

    componentDidUpdate() {
        var uid = this.props.match.params.uid;
        var query = this.props.match.params.query;
        var newForm = (uid == null) ? "search" : "home";
        if(this.state.currentForm !== newForm ||
           this.state.query !== query ||
           this.state.uid !== uid) {
               this.setState({
                   currentForm: newForm,
                   query: query,
                   uid: uid
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
            case "home":
                formToLoad = <HomeForm 
                                authID={this.state.authID}
                                uid={this.state.uid}
                                />;
                break;
            case "search":
                formToLoad = <SearchForm
                                authID={this.state.authID}
                                query={this.state.query}
                             />
                break;
            default:
                break;
        }
        return (
            <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <NavBar fullWidth={true} authID={this.state.authID} />
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
