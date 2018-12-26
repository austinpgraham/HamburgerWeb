import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { ROOT } from '../constants';
import { Wishlist } from '../components/display';

const WishlistCreateURL = ROOT + "/users/_/wishlists";
const UserDataURL = ROOT + "/users/_";

class HomeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {uid: this.props.match.params.uid, inCreate: false, formDisable: false,
                      wishlistid: null, isPrivate: true, wishlistidError: false, wishlists: null,
                      redirectTo: null, isListLoading: true};
        this.openCreateForm = this.openCreateForm.bind(this);
        this.closeCreateForm = this.closeCreateForm.bind(this);
        this.doCreate = this.doCreate.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.renderWishlists = this.renderWishlists.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderListLoading = this.renderListLoading.bind(this);
    }

    componentDidMount() {
        var userURL = UserDataURL.replace("_", this.state.uid);
        axios.get(userURL, {withCredentials: true}).then((response)=>{
            var items = response.data.wishlists.items;
            var itemList = [];
            for (var item in items) {
                var newItem = <Wishlist key={item} isprivate={!items[item].is_public} createdAt={items[item].created_at.split(' ')[0]}>{items[item]}</Wishlist>
                itemList.push(newItem);
            }
            this.setState({wishlists: itemList, isListLoading: false});
        }).catch((error) => {
            if(error.response.status === 403) {
                this.setState({redirectTo: "/login"});
            }
        });
    }

    renderWishlists() {
        if (this.state.wishlists !== null) {
            var gridItems = [];
            this.state.wishlists.forEach(function(p) {
                var newItem = <Grid key={p} item xs={6}>{p}</Grid>
                gridItems.push(newItem);
            });
            return gridItems;
        }
        return <Typography component="h1">No Wishlists Created.</Typography>;
    }

    renderListLoading() {
        if (this.state.isListLoading) {
            return <Grid item xs={6}><CircularProgress size={30}/></Grid>
        }
        return null;
    }

    renderRedirect() {
        if(this.state.redirectTo !== null) {
            return <Redirect to={this.state.redirectTo} />
        }
        return null
    }

    openCreateForm() {
        this.setState({inCreate: true});
    }

    closeCreateForm() {
        this.setState({inCreate: false});
    }

    doCreate() {
        this.setState({isLoading: true, formDisable: true});
        var data = {is_public: !this.state.isPrivate, title: this.state.wishlistid};
        var url = WishlistCreateURL.replace("_", this.state.uid);
        axios.post(url, data, {withCredentials: true}).then((response) =>{
            this.setState({isLoading: false, formDisable: false, wishlistid: null, isPrivate: true, wishlistidError: false});
            this.closeCreateForm();
        }).catch(() => {
            this.setState({wishlistidError: true, isLoading: false, formDisable: false});
        });
    }

    renderLoading() {
        if(this.state.isLoading) {
            return <CircularProgress size={30} />
        }
        return null;
    }

    onFormChange(event) {
        if(event.target.id === "title") {
            this.setState({wishlistid: event.target.value, wishlistidError: false});
        } else {
            this.setState({isPrivate: !this.state.isPrivate});
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Grid container spacing={8}>
                    {this.renderListLoading()}
                    <Grid item xs={12}>
                        <NavBar fullWidth={true}>{this.state.uid}</NavBar>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={this.openCreateForm}>
                            <AddIcon />
                            Create Wishlist
                        </Button>
                    </Grid>
                    {this.renderWishlists()}
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
                            disabled={this.state.formDisable}
                            onChange={this.onFormChange}
                            error={this.state.wishlistidError}
                        />
                        <FormControlLabel
                            control={
                                <CheckBox checked={this.state.isPrivate}/>
                            }
                            label="Private?"
                            id="private"
                            disabled={this.state.formDisable}
                            onChange={this.onFormChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        {this.renderLoading()}
                        <Button variant="contained" color="primary" onClick={this.doCreate} id="create-wishlist" disabled={this.state.formDisable}>
                            Create
                        </Button>
                        <Button color="primary" onClick={this.closeCreateForm} id="cancel-wishlist" disabled={this.state.formDisable}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default HomeForm;
