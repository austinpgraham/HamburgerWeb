import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles,
         Button,
         CircularProgress,
         FormControl,
         InputLabel,
         Select,
         MenuItem, 
         FilledInput,
         TextField,
         Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ROOT } from '../../constants';
import axios from 'axios';

const styles = {
    formControl: {
        minWidth: 200
    },
    dialog: {
        width: '500px'
    }
}

const ProvidersURL = ROOT + "/providers";

class AddProductDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {authID: this.props.authID,
                      renderProvider: "Select Provider",
                      isLoading: false,
                      isFullLoading: true,
                      allDisable: true,
                      allProviders: null,
                      itemIDError: null,
                      providerError: null,
                      itemID: null};
    }

    componentDidMount() {
        axios.get(ProvidersURL, {withCredentials: true}).then((response) => {
            this.setState({allProviders: response.data,
                           isFullLoading: false,
                           allDisable: false
            });
        });
    }

    addProduct = () => {
        if(this.state.renderProvider === "Select Provider") {
            this.setState({providerError: "Provider Required"});
        } else if (this.state.itemID == null) {
            this.setState({itemIDError: "Item ID required"});
        } else {
            this.setState({isLoading: true, allDisable: true});
            var itemLoadURL = ROOT +"/users/"+this.props.authID+"/"+this.props.listid;
            var data = {
                "provider": this.state.renderProvider.toLowerCase(),
                "identifier": this.state.itemID
            }
            axios.post(itemLoadURL, data, {withCredentials: true}).then((response)=> {
                this.setState({isLoading: false, allDisable: false, renderProvider: null, itemID: null});
                this.props.onCloseHandler();
            }).catch((e)=>{
                var errorMessage = (e.response.status === 409) ? "Item already in list." : "Item not found";
                this.setState({isLoading: false, allDisable: false, itemIDError: errorMessage});
            });
        }
    }

    renderFullLoading = () => {
        if(this.state.isFullLoading) {
            return <CircularProgress size={30} />
        }
        return this.renderContents();
    }

    renderLoading = () => {
        if(this.state.isLoading) {
            return <CircularProgress size={30} />
        }
        return null;
    }

    doClose = () => {
        this.setState({isLoading: false, allDisable: false, renderProvider: null, itemID: null});
        this.props.onCloseHandler();
    }

    renderEbay = () => {
        return (
            <TextField
                required
                id="identifier"
                label="Item ID"
                placeholder="Item ID"
                variant="outlined"
                fullWidth={true}
                disabled={this.state.allDisable}
                helperText={this.state.itemIDError}
                error={this.state.itemIDError != null}
                onChange={this.itemIDChanged}
            />
        )
    }

    selectChanged = e => {
        this.setState({renderProvider: e.target.value, providerError: null});
    }

    itemIDChanged = e => {
        this.setState({itemID: e.target.value, itemIDError: null});
    }

    renderMenuItems = () => {
        var items = []
        var allProviders = this.state.allProviders;
        for(var item in allProviders) {
            var target = allProviders[item];
            target = target.charAt(0).toUpperCase() + target.slice(1);
            var new_item = <MenuItem value={target}>{target}</MenuItem>
            items.push(new_item);
        }
        return items;
    }

    renderContents = () => {
        var formData = null;
        switch(this.state.renderProvider) {
            case "Ebay":
                formData = this.renderEbay();
                break;
            default:
                break;
        }
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <FormControl variant="filled" className={this.props.classes.minWidth} disabled={this.state.allDisable} error={this.state.providerError != null}>
                            <InputLabel htmlFor="outlined-provider">
                                Provider
                            </InputLabel>
                            <Select
                                autoWidth
                                value={this.state.renderProvider}
                                onChange={this.selectChanged}
                                input={
                                    <FilledInput
                                        name="provider"
                                        id="outlined-provider"
                                    />
                                }
                            >
                                <MenuItem value="Select Provider">Select Provider</MenuItem>
                                {this.renderMenuItems()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {formData}
                    </Grid>
                </Grid>
            </div>
        );
    }

    render() {
        return (
            <Dialog open={this.props.isVisible} aria-labelledby="add-form">
                <DialogTitle id="add-form">Add Product</DialogTitle>
                <DialogContent>
                    {this.renderFullLoading()}
                </DialogContent>
                <DialogActions>
                    {this.renderLoading()}
                    <Button variant="contained" color="primary" disabled={this.state.allDisable} onClick={this.addProduct}>
                        Add
                    </Button>
                    <Button color="primary" onClick={this.props.onCloseHandler} disabled={this.state.allDisable}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddProductDialog);
