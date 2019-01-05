import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {

}

class UserCard extends Component {
    constructor(props) {
        super(props);

        this.state = {redirectTo: null, target: this.props.username}
        this.renderRedirect = this.renderRedirect.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
    }

    renderRedirect() {
        if(this.state.redirectTo !== null) {
            return <Redirect to={this.state.redirectTo} />
        }
        return null;
    }

    componentDidUpdate() {
        if(this.state.redirectTo !== null) {
            this.setState({redirectTo: null});
        }
    }

    goToProfile() {
        this.setState({redirectTo: "/"+this.state.target});
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.props.username}
                        </Typography>
                        <Typography component="p">
                            {this.props.name}
                        </Typography>
                        <Typography component="p">
                            {this.props.listCount + " total list(s)"}
                        </Typography>
                    </CardContent>
                    <CardActions>
                            <Button size="small" color="primary" variant="contained" onClick={this.goToProfile}>
                                View Profile
                            </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(UserCard);
