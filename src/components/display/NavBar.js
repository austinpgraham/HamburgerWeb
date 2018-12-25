import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { ROOT } from '../../constants';

const LogoutURL = ROOT + "/users/_/logout";

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {anchor: null, redirectTo: null};
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }

    componentDidMount() {
        this.setState({uid: this.props.children});
    }

    openMenu(event) {
        this.setState({anchor: event.currentTarget});
    }

    closeMenu(_) {
        this.setState({anchor: null});
    }

    doLogout(){
        var url = LogoutURL.replace("_", this.state.uid);
        axios.get(url, {withCredentials: true}).then(() => {
            this.setState({redirectTo: "/login"});
        });
    }

    renderRedirect() {
        if(this.state.redirectTo !== null) {
            return <Redirect to={this.state.redirectTo} />
        }
        return null
    }

    render() {
        const anchor = this.state.anchor;
        const open = Boolean(anchor);

        return (
            <div>
                {this.renderRedirect()}
                <AppBar position="static">
                    <ToolBar>
                        <Typography variant="h6" color="inherit">
                            Home
                        </Typography>
                        <div style={styles.right}>
                            <IconButton color="inherit" aria-owns={open ? "profile-menu" : undefined} aria-haspopup="true"
                                        onClick={this.openMenu}>
                                <AccountCircle />
                            </IconButton>
                            <Menu id="profile-menu"
                                anchorEl={anchor}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                }}
                                open={open}
                                onClose={this.closeMenu}>
                                <MenuItem onClick={this.closeMenu}>Profile</MenuItem>
                                <MenuItem onClick={this.doLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </ToolBar>
                </AppBar>
            </div>
        );
    }
}

const styles={
    right: {
        marginLeft: '95%'
    }
}

export default NavBar;
