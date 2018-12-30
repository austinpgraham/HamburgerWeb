import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.renderPermedButtons = this.renderPermedButtons.bind(this);
    }

    renderPermedButtons() {
        debugger;
        if(this.props.permissions.includes("edit")) {
            return [<Button variant="outlined" color="primary">
                            Edit
                        </Button>,
                        <Button variant="contained" color="secondary">
                            Delete
                        </Button>];
        }
        return null;
    }

    render() {
        var isPrivate = (this.props.isprivate) ? "Private" : "Public";
        var privateColor = (this.props.isprivate) ? "secondary" : "primary";
        return (
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
                    <Button size="small" color="primary" variant="contained">
                        View
                    </Button>
                    {this.renderPermedButtons()}
                </CardActions>
            </Card>
        );
    }
}

export default Wishlist;
