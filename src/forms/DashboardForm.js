import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


class DashboardForm extends Component {
    constructor(props) {
        super(props);

        /* 
            friendWishlist is comprised of products
                needs drop down
            yourWishlists is comprised of wishlists
            friendsList is your friends list
                this is viewed by month and in order of date
        */
        this.state = {friendsList: null, friendWishlist: null, yourWishLists: null, isLoading: false, allDisable: null};
    }

    /*  
        Go to previous month
        Needs to change friendsList
    */
    previousMonth = () => {
        
    }

    /*
        Go to next month
        Needs to change friendsList
    */
    nextMonth = () => {

    }

    /*
        Changes the current friend's shown wishlist
        Needs to change friendsWishList
        Uses dropdown menu
    */
    changeFriendWishlist = (e) => {
        this.setState({isLoading: true, allDisable: true});

    }

    /*
        Changes the friend
    */
    changeFriend = (e) => {
        this.setState({isLoading: true, allDisable: true});

    }

    /*
        Add a wishlist to your wishlists
        Needs to change yourWishlists
    */
    addWishlist = (e) => {

    }

    /*
        Delete a wishlist from your wishlists
        Needs to change yourWishlists
    */
    deleteWishlist = (e) => {

    }

    showLoading() {
        if(this.state.isLoading) {
            return <CircularProgress size={30}/>
        }
        return null;
    }

    render() {
        return(
            <div style={ styles.container }>
            <div style={ styles.outline }>
                {/*Big container*/}
                <Grid container spacing={24} justify="center">
                    {/*Dashboard*/}
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h4" color="primary">
                            Dashboard
                        </Typography>
                    </Grid>
                    {/*Container for friends list and friends wish list*/}
                    <Grid item xs={12}>
                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <Typography gutterBottom variant="h5" color="primary">
                                    Friends List
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom variant="h5" color="primary">
                                    Friend's Wishlist
                                </Typography>
                            </Grid>    
                            {/*friends list*/}
                            <div style={ styles.outlineFriends }>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h5" color="primary">
                                        {/* Current month of system? */}
                                        Month
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        color="primary"
                                    >
                                        {/* Friends in order of date for that month with profile picture */}
                                        Friend 1
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        color="primary"
                                    >
                                        {/* Friends in order of date for that month with profile picture */}
                                        Friend 2
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        color="primary"
                                    >
                                        {/* Friends in order of date for that month with profile picture */}
                                        Friend 3
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        color="primary"
                                    >
                                        {/* Friends in order of date for that month with profile picture */}
                                        Friend 4
                                    </Button>
                                </Grid>
                                <Grid container spacing={8}>
                                    <Grid item xs="auto">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Previous Month
                                        </Button>
                                    </Grid>
                                    <Grid item xs="auto">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Next Month
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid> </div>
                            {/*friends wish list*/}
                            <Grid item xs={6}>
                                <Grid container spacing={24} justify="center">
                                    <div style={ styles.outlineProducts }>
                                    <Grid item xs={6}>
                                        <Button 
                                            color="primary"
                                        >
                                            Product 1
                                        </Button>
                                    </Grid> </div>
                                    <div style={ styles.outlineProducts }>
                                    <Grid item xs={6}>
                                        <Button 
                                            color="primary"
                                        >
                                            Product 2
                                        </Button>
                                    </Grid> </div>
                                    <div style={ styles.outlineProducts }>
                                    <Grid item xs={6}>
                                        <Button 
                                            color="primary"
                                        >
                                            Product 3
                                        </Button>
                                    </Grid> </div>
                                    <div style={ styles.outlineProducts }>
                                    <Grid item xs={6}>
                                        <Button 
                                            color="primary"
                                        >
                                            Product 4
                                        </Button>
                                    </Grid> </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {/*Your Wishlists*/}
                        <Grid item xs={4}>
                            <Grid container spacing={24}>
                                {/*Heading and buttons*/}
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h5" color="primary">
                                        Your Wishlists
                                    </Typography>
                                </Grid>
                                {/*Buttons*/}
                                <Grid container spacing={8}>
                                    {/*Add*/}
                                    <Grid item xs="auto">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                    {/*Delete*/}
                                    <Grid item xs="auto">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/*Wishlists*/}
                    </Grid>
                </Grid>
            </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        width: '175%',
        height: '100%',
        paddingLeft: '20px',
        top: 0,
        left: 0
    },
    outlineFriends: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#1565c0',
        borderRadius: 6,
        borderStyle: 'solid',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '20px',
        width: '40%'
    },
    outline: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#1565c0',
        borderRadius: 6,
        borderStyle: 'solid',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '65px',
        width: '40%'
    },
    outlineProducts: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#1565c0',
        borderRadius: 6,
        borderStyle: 'solid',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '30px',
        paddingBottom: '30px',
        width: '40%'
    },
}

export default DashboardForm;