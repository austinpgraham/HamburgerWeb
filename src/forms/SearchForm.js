import React, { Component } from 'react';
import { Title, UserCard } from '../components/display';
import { withStyles, CircularProgress, Grid } from '@material-ui/core';
import { ROOT } from '../constants';
import axios from 'axios';

const styles = {

}

const SearchURL = ROOT + "/users/search?query=";

class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {authID: this.props.authID, 
                      query: this.props.query, 
                      isLoading: true,
                      results: null};
        this.renderLoading = this.renderLoading.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
    }

    getSearchResults(query) {
        var url = SearchURL + query;
        axios.get(url, {withCredentials: true}).then((response) => {
            this.setState({results: response.data, 
                           isLoading: false,
                           query: query});
        });
    }

    componentDidMount() {
        this.getSearchResults(this.props.query);
    }

    componentDidUpdate() {
        if(this.props.query !== this.state.query) {
            this.getSearchResults(this.props.query);
        }
    }

    renderResults() {
        if(this.state.results === null || this.state.results.length <= 0) {
            return <Title>No Results</Title>;
        }
        var results = this.state.results;
        var userList = [];
        for(var user in results) {
            var newUser = <Grid item xs={12}><UserCard key={user}
                                    username={results[user].username}
                                    name={results[user].first_name + " " + results[user].last_name}
                                    listCount={Object.keys(results[user].wishlists.items).length}
                          /></Grid>
            userList.push(newUser);
        }
        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Title>Search Results</Title>
                </Grid>
                {userList}
            </Grid>
        );
    }

    renderLoading() {
        if(this.state.isLoading) {
            return <CircularProgress size={30} />
        }
        return this.renderResults();
    }

    render() {
        return (
            <div>
                {this.renderLoading()}
            </div>
        );
    }
}

export default withStyles(styles)(SearchForm);
