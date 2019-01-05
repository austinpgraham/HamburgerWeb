import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles, CircularProgress, Grid } from '@material-ui/core';
import { NavBar } from '../components/display';
import { ROOT } from '../constants';
import axios from 'axios';
import HomeForm from './HomeForm';

const AuthURL = ROOT + "/auth";

const styles = {

};

class MyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {currentForm: 'home', 
                      redirectTo: null,
                      isLoading: true,
                      uid: this.props.match.params.uid};
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }

    componentDidMount() {
        axios.get(AuthURL, {withCredentials: true}).then((response) => {
            this.setState({authID: response.data.username, isLoading: false});
        });
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
        debugger;
        switch(this.state.currentForm) {
            case "home":
                formToLoad = <HomeForm 
                                authID={this.state.authID}
                                uid={this.state.uid}
                                />;
        }
        return formToLoad;
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <NavBar fullWidth={true} authID={this.state.authID} />
                    </Grid>
                    <Grid item xs={12}>
                        {this.renderLoading()}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MyForm);
