import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { ROOT } from '../../constants';

const LogoutURL = ROOT + "/users/_/logout";

class NavBar extends Component {
    constructor(props) {
        super(props);

        var query = this.props.query;
        this.state = {anchor: null,
                      redirectTo: null,
                      searchQuery: query,
                      authID: this.props.authID};
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    componentDidUpdate() {
        if(this.state.redirectTo !== null) {
            this.setState({redirectTo: null});
        }
    }

    openMenu(event) {
        this.setState({anchor: event.currentTarget});
    }

    goHome() {
        var redirectURL = "/"+this.state.authID;
        this.setState({redirectTo: redirectURL, anchor: null});
    }

    closeMenu(_) {
        this.setState({anchor: null});
    }

    updateQuery(event) {
        this.setState({searchQuery: event.target.value});
    }

    doLogout(){
        var url = LogoutURL.replace("_", this.props.authID);
        axios.get(url, {withCredentials: true}).then(() => {
            this.setState({redirectTo: "/login"});
        });
    }

    doSearch() {
        var redirectURL = "/search/" + this.state.searchQuery;
        this.setState({redirectTo: redirectURL});
    }

    renderRedirect() {
        if(this.state.redirectTo !== null) {
            var url = this.state.redirectTo;
            return <Redirect to={url} />
        }
        return null
    }

    render() {
        const anchor = this.state.anchor;
        const open = Boolean(anchor);
        const { classes } = this.props;

        return (
            <div style={{width: '100%'}}>
                {this.renderRedirect()}
                <AppBar position="static">
                    <ToolBar>
                        <Typography variant="h6" color="inherit">
                            Home
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search Users..."
                                classes={{root: classes.root, input: classes.input}}
                                onChange={this.updateQuery}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        this.doSearch();
                                    }
                                }}
                                value={this.state.searchQuery}
                            />
                        </div>
                        <div className={classes.grow}/>
                        <div>
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
                                <MenuItem onClick={this.goHome}>My Account</MenuItem>
                                <MenuItem onClick={this.doLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </ToolBar>
                </AppBar>
            </div>
        );
    }
}

const styles = theme => ({
    root:{
        color: 'inherit',
        width: '100%'
    },
    input: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    grow: {
        flexGrow: 1
    }
});

export default withStyles(styles)(NavBar);
