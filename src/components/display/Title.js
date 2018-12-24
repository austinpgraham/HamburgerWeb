import React, { Component } from 'react';

class Title extends Component {
    render() {
        return(
            <div style={styles.container}>
                <h1>{this.props.children}</h1>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto,sans-serif'
    }
}

export default Title;
