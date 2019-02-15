import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Title } from '../components/display';
import { ROOT } from '../constants';
import { Link } from 'react-router-dom';
import {HamPrimaryButton} from '../components/display';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

const GoogleURL = ROOT + "/users/google";
const FacebookURL = ROOT + "/users/facebook";
const LoginURL = ROOT + "/users/_/login";
const AuthURL = ROOT + "/auth";

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

const textStyles = createMuiTheme({
    overrides: {
    },
    typography: {
        fontFamily: [
          'Roboto',
        ].join(','),
    },
});
class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {username: null, password: null, redirectTo: null, isLoading: false, allDisable: false,
                      usernameError: false, passwordError: false};
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.loginManual = this.loginManual.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }


    componentDidMount() {
        axios.get(AuthURL, {withCredentials: true}).then((response)=>{
            var username = response.data.username;
            this.setState({redirectTo: "/"+username});
        });
    }

    loginWithGoogle() {
         axios.get(GoogleURL, {withCredentials: true}).then((data)=>{
            console.log(data);
         });
    }

    loginWithFacebook() {
        axios.get(FacebookURL, {withCredentials: true}).then((data)=>{
            console.log(data);
        });
    }

    renderLoading() {
        if(this.state.isLoading) {
            return <CircularProgress size={30} />
        }
        return null;
    }

    loginManual() {
        this.setState({isLoading: true, allDisable: true});
        var loginURL = LoginURL.replace("_", this.state.username);
        var reqData = this.state;
        axios.post(loginURL, reqData, {withCredentials: true}).then((response)=>{
            var homeURL = "/_".replace("_", this.state.username);
            this.setState({redirectTo: homeURL});
        }).catch((error)=>{
            if(error.response.status === 404) {
                this.setState({usernameError: true, isLoading: false, allDisable: false});
            } else if(error.response.status === 403) {
                this.setState({passwordError: true, isLoading: false, allDisable: false});
            }
        });
    }

    onTextChange(e) {
        var newObj = {}
        newObj[e.target.id] = e.target.value;
        newObj[e.target.id+"Error"] = false;
        this.setState(newObj);
    }

    renderRedirect() {
        if(this.state.redirectTo != null) {
            return <Redirect to={this.state.redirectTo} />;
        }
        return null;
    }

    render() {
        return(
                         <div style={ styles.container }>
                <div style={ styles.outline }>
                    {this.renderRedirect()}
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                        <Title>SimonSays</Title>
                        </Grid>
                        <Grid item xs={12}>
                          <MuiThemeProvider theme={textStyles}>
                         <TextField
                          required
                          id="username"
                         label="Username"
                         placeholder="Username"
                          variant="filled"
                         fullWidth={true}
                         error={this.state.usernameError}
                          onChange={this.onTextChange}
                           disabled={this.state.allDisable}
                  />
                </MuiThemeProvider>
            </Grid>
            <Grid item xs={12}>
                 <MuiThemeProvider theme={textStyles}>
                   <TextField
                    required
                    id="password"
                    label="Password"
                    placeholder="Password"
                    variant="filled"
                    type="password"
                    fullWidth={true}
                    error={this.state.passwordError}
                    onChange={this.onTextChange}
                    disabled={this.state.allDisable}
                  />
                </MuiThemeProvider>
            </Grid>
                    {/* <Grid item xs={6}>
                            <Fab
                                variant="extended"
                                color="primary"
                                disabled={this.state.allDisable}
                                onClick={this.loginWithGoogle}
                            >
                            <AddIcon />
                            Sign in with Google
                            </Fab>
                        </Grid>
                        <Grid item xs={6}>
                            <Fab
                                variant="extended"
                                color="secondary"
                                disabled={this.state.allDisable}
                                onClick={this.loginWithFacebook} 
                            >
                            <AddIcon />
                            Sign in with Facebook
                            </Fab>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                <Grid item xl={2}>
                                    <HamPrimaryButton
                        onClick={this.loginManual}
                        disabled={this.state.allDisable}
                    >
                        Login
                    </HamPrimaryButton>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to="/register"
                        disabled={this.state.allDisable}
                    >
                        Register
                    </Button>
                </Grid>
                <Grid item xs={9} >
                    {this.renderLoading()}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    </div>
    </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0
    },
    outline: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#2196f3',
        borderRadius: 6,
        borderStyle: 'solid',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        paddingBottom: '20px',
        width: '30%'
    }
}

export default withStyles(LoginForm)(HamPrimaryButton);
