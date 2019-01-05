import React, { Component } from 'react';
import { Title } from '../components/display';
import { withStyles, CircularProgress } from '@material-ui/core';
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
        return <Title>Search Results</Title>
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
