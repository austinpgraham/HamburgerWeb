import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Title } from '../components/display';
import { ROOT } from '../constants';
import axios from 'axios';

const RegisterURL = ROOT + "/users/";
const LoginURL = ROOT + "/users/_/login";
const HomeURL = "/_";

class RegisterForm extends Component {
    constructor(props){
        super(props);

        this.state = {username: "", password: "", cpassword: "", email: "", first_name: "", last_name: "",
                      usernameError: false, allDisable: false, isLoading: false, cpasswordError: false,
                      redirectTo: null, emailError: false, errorText: null};
        this.onTextChange = this.onTextChange.bind(this);
        this.createUser = this.createUser.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    onTextChange(e) {
        var newObj = {}
        newObj[e.target.id] = e.target.value;
        newObj[e.target.id+"Error"] = false;
        if(e.target.id === 'password') {
            newObj['cpasswordError'] = this.state.cpassword !== e.target.value;
        } else if(e.target.id === 'cpassword') {
            newObj['cpasswordError'] = this.state.password !== e.target.value;
        }
        newObj['errorText'] = null;
        this.setState(newObj);
    }

    createUser() {
        this.setState({isLoading: true, allDisable: true});
        axios.post(RegisterURL, this.state).then(()=>{
            var url = LoginURL.replace("_", this.state.username);
            axios.post(url, this.state, {withCredentials: true}).then(()=>{
                var userURL = HomeURL.replace("_", this.state.username);
                this.setState({redirectTo: userURL});
            }).catch(()=>{
                this.setState({redirectTo: "/login"});
            });
        }).catch(()=> {
            this.setState({usernameError: true, isLoading: false, allDisable: false, emailError: true,
                           errorText: "Either username or email is taken."});
        });
    }

    renderRedirect() {
        if(this.state.redirectTo != null) {
            return <Redirect to={this.state.redirectTo} />
        }
        return null;
    }

    showLoading() {
        if(this.state.isLoading) {
            return <CircularProgress size={30}/>
        }
        return null;
    }

    render() {
        return (

            <div style={ styles.container }>
                <div style={ styles.outline }>
                    {this.renderRedirect()}
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Title>Register</Title>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="first_name"
                                label="First"
                                placeholder="First"
                                variant="filled"
                                fullWidth={true}
                                onChange={this.onTextChange}
                                disabled={this.state.allDisable}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="last_name"
                                label="Last"
                                placeholder="Last"
                                variant="filled"
                                fullWidth={true}
                                onChange={this.onTextChange}
                                disabled={this.state.allDisable}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                label="Email"
                                placeholder="Email"
                                variant="filled"
                                fullWidth={true}
                                onChange={this.onTextChange}
                                disabled={this.state.allDisable}
                                error={this.state.emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="username"
                                label="Username"
                                placeholder="Username"
                                variant="filled"
                                fullWidth={true}
                                onChange={this.onTextChange}
                                error={this.state.usernameError} 
                                disabled={this.state.allDisable}
                                helperText={this.state.errorText}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                label="Password"
                                placeholder="Password"
                                type="password"
                                variant="filled"
                                fullWidth={true}
                                onChange={this.onTextChange}
                                disabled={this.state.allDisable}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="cpassword"
                                label="Confirm Password"
                                placeholder="Password"
                                type="password"
                                variant="filled"
                                fullWidth={true}
                                onChange={this.onTextChange} 
                                disabled={this.state.allDisable}
                                error={this.state.cpasswordError}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.createUser}
                                fullWidth={false}
                                disabled={this.state.allDisable}
                            >
                                Create
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            {this.showLoading()}
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

export default RegisterForm;
