import React, { Component } from 'react';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import classNames from 'classnames';
class HamPrimaryButton extends Component {
    render() {
        const { classes } = this.props;
        return(
            <div>
            <Button>
                className={classNames(classes.margin, classes.cssRoot)}
            </Button>
            </div>
        )
    }
}
const buttonStyle = build => ({
                margin: {
                    margin: 0,
                },
                cssRoot: {
                    color: grey[50],
                    backgroundColor: green[500],
                    '&:hover': { 
                        backgroundColor: green[700],
                    },
                },
            });           

export default withStyles(HamPrimaryButton);
