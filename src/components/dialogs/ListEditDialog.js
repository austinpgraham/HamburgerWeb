import React, { Component } from 'react';
import { withStyles, 
         Dialog,
         DialogTitle,
         DialogContent,
         DialogActions,
         CircularProgress,
         Button, 
         TextField,
         Grid,
         FormControlLabel,
         Checkbox} from '@material-ui/core';
import { ROOT } from '../../constants';
import axios from 'axios';


const styles = {

}

class ListEditDialog extends Component {
    constructor(props) {
        super(props);

        var title = (this.props.listData != null) ? this.props.listData.title : null;
        var isPublic = (this.props.listData != null) ? this.props.listData.is_public : null;
        this.state = {
            title: title,
            titleError: null,
            isPublic: isPublic,
            isLoading: false,
            allDisable: false
        };
    }

    onTitleChange = e => {
        this.setState({title: e.target.value, titleError: null});
    }

    onPublicChange = () => {
        this.setState({isPublic: !this.state.isPublic});
    }

    renderLoading = () => {
        if(this.state.isLoading) {
            return <CircularProgress size={30} />
        }
        return null;
    }

    doEdit = () => {
        this.setState({isLoading: true, allDisable: true});
        var data = {
            "title": this.state.title,
            "is_public": this.state.isPublic
        }
        var editURL = ROOT + "/users/" + this.props.authID + "/" + this.props.listData.title + "/edit";
        axios.post(editURL, data, {withCredentials: true}).then((response) => {
            this.setState({isLoading: false, allDisable: false});
            this.props.closeDialogHandler();
            this.props.editSuccessfulHandler();
        }).catch((e) => {
            if(e.response.status == 422) {
                this.setState({titleError: "Title already exists in your wishlists."});
            }
            this.setState({isLoading: false, allDisable: false});
        });
    }

    render() {
        return (
            <Dialog open={this.props.isVisible} aria-labelledby="edit-form">
                <DialogTitle id="edit-form">Edit Wishlist</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="title"
                                label="Title"
                                placeholder="Title"
                                variant="outlined"
                                fullWidth={true}
                                disabled={this.state.allDisable}
                                helperText={this.state.titleError}
                                error={this.state.titleError != null}
                                onChange={this.onTitleChange}
                                value={this.state.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={!this.state.isPublic} />
                                }
                                label="Private?"
                                id="private"
                                disabled={this.state.allDisable}
                                onChange={this.onPublicChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {this.renderLoading()}
                    <Button variant="contained" color="primary" disabled={this.state.allDisable} onClick={this.doEdit}>
                        Ok
                    </Button>
                    <Button color="primary" onClick={this.props.closeDialogHandler}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ListEditDialog);
