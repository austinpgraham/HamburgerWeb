import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavBar, Title } from '../components/display';
import { withStyles, CircularProgress } from '@material-ui/core';
import { ROOT } from '../constants';
import axios from 'axios';
import queryString from 'query-string';

const styles = {

}

const AuthURL = ROOT + "/auth";
const SearchURL = ROOT + "/users/search?query=";

class SearchForm extends Component {

    constructor(props) {
        super(props);

        var query = queryString.parse(this.props.location.search);
        this.state = {authID: null, query: query.query, isLoading: true, results: null, redirectTo: null};
        this.renderLoading = this.renderLoading.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    componentDidMount() {
        axios.get(AuthURL, {withCredentials: true}).then((response) => {
            this.setState({authID: response.data.username});
            var url = SearchURL + this.state.query;
            axios.get(url, {withCredentials: true}).then((response) => {
                this.setState({results: response.data, isLoading: false});
            });
        }).catch((error) =>{
            this.setState({redirectTo: "/login"});
        });
    }

    renderResults() {
        if(this.state.results === null || this.state.results.length <= 0) {
            return <Title>No Results</Title>;
        }
        return <Title>Search Results</Title>
    }

    renderLoading() {
        if(this.state.isLoading) {
            return <CircularProgress size={30} />
        }
        return this.renderResults();
    }

    renderRedirect() {
        if(this.state.redirectTo !== null) {
            return <Redirect to={this.state.redirectTo} />
        }
        return null
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <NavBar fullWidth={true} authID={this.state.authID} query={this.state.query} />
                {this.renderLoading()}
            </div>
        );
    }
}

export default withStyles(styles)(SearchForm);
