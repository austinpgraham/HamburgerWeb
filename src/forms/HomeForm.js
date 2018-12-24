import React, { Component } from 'react';
import { NavBar } from '../components/display';

class HomeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {uid: this.props.match.params.uid};
    }

    render() {
        return (
            <div>
                <NavBar>{this.state.uid}</NavBar>
            </div>
        );
    }
}

export default HomeForm;
