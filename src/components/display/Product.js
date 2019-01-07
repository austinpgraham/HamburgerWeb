import React, { Component } from 'react';
import { withStyles, 
         Card, 
         CardActions, 
         CardContent, 
         Typography,
         CardMedia,
         Button,
         CardHeader, 
         Avatar} from '@material-ui/core';


const styles = {
    media: {
        height: '200px',
        width: '300px',
        textAlign: 'center'
    }
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openDonate = () => {
        this.props.openDonateHandler(this.props.listID, this.props.pid);
    }

    render() {
        const { classes } = this.props;
        return (
            <Card raised>
                <CardHeader
                    avatar = {
                        <Avatar aria-label="Provider" src="/static/ebay.jpg"/>
                    }
                    title={this.props.children}
                    subheader={"Price: $"+this.props.price}
                />
                <CardMedia image={this.props.image} className={classes.media}/>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={this.openDonate}>
                        Donate
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Product);
