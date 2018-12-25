import React, { Component } from 'react';
import { NavBar } from '../components/display';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class HomeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {uid: this.props.match.params.uid, inCreate: false, allDisable: false};
        this.openCreateForm = this.openCreateForm.bind(this);
        this.closeCreateForm = this.closeCreateForm.bind(this);
    }

    openCreateForm() {
        this.setState({inCreate: true});
    }

    closeCreateForm() {
        this.setState({inCreate: false});
    }

    render() {
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <NavBar fullWidth={true}>{this.state.uid}</NavBar>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={this.openCreateForm}>
                            <AddIcon />
                            Create Wishlist
                        </Button>
                    </Grid>
                </Grid>

                <Dialog open={this.state.inCreate} onClose={this.closeCreateForm} aria-labelledby="create-form">
                    <DialogTitle id="create-form">Create Wishlist</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            id="title"
                            label="Wishlist Title"
                            placeholder="Title"
                            variant="filled"
                            fullWidth={true}
                            disabled={this.state.allDisable}
                        />
                        <TextField
                            required
                            id="source"
                            label="Product Source"
                            placeholder="Source"
                            variant="filled"
                            fullWidth={true}
                            disabled={this.state.allDisable}
                        />
                        <FormControlLabel
                            control={
                                <CheckBox />
                            }
                            label="Private?"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.closeCreateForm}>
                            Create
                        </Button>
                        <Button color="primary" onClick={this.closeCreateForm}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default HomeForm;
