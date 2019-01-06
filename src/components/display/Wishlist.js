import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {redirectTo: null};
        this.renderPermedButtons = this.renderPermedButtons.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    renderPermedButtons() {
        if(this.props.permissions.includes("edit")) {
            return [<Button variant="outlined" color="primary" key="edit">
                            Edit
                        </Button>,
                        <Button variant="contained" color="secondary" key="delete">
                            Delete
                        </Button>];
        }
        return null;
    }

    viewList = () => {
        var url = "/"+this.props.uid+"/"+this.props.listid;
        this.setState({redirectTo: url});
    }

    renderRedirect() {
        if(this.state.redirectTo != null) {
            return <Redirect to={this.state.redirectTo} />
        }
        return null;
    }

    render() {
        var isPrivate = (this.props.isprivate) ? "Private" : "Public";
        var privateColor = (this.props.isprivate) ? "secondary" : "primary";
        return (
            <div>
                {this.renderRedirect()}
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.props.children.title}
                        </Typography>
                        <Typography component="p" color={privateColor}>
                            {isPrivate}
                        </Typography>
                        <Typography component="p">
                            Created {this.props.createdAt}
                        </Typography>
                        <Typography component="p">
                            {Object.keys(this.props.children.items).length} total items
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained" onClick={this.viewList}>
                            View
                        </Button>
                        {this.renderPermedButtons()}
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Wishlist;
