import React, { Component } from 'react';

class HomeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        var uid = this.props.match.params.uid;
        this.setState({uid: uid});
    }

    render() {
        return (
            <h1>{this.state.uid}</h1>
        );
    }
}

const styles = {

}

export default HomeForm;
