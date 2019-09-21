import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FullScreenDialog from './fullScreenDialog';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import SignInModel from './SignInModel';

const styles = theme => ({
    fab: {
        margin: theme.spacing(1),
        background: "#000000",
        fontWeight: "bolder",
        color: "wheat",
        '&:hover': {
            outline: "none",
            opacity: 1,
            background: "#000000",
        },
        '&:focus': {
            outline: "none",
            opacity: 1,
            background: "#000000",
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fixed: {
        [theme.breakpoints.down('lg')]: {
            display: "block",
            position: "fixed",
            top: "95%",
            left: "90%",
            transform: "translate(-90%, -95%)"
        },
        [theme.breakpoints.down('md')]: {
            display: "block",
            position: "fixed",
            top: "95%",
            left: "90%",
            transform: "translate(-90%, -95%)"
        },
        [theme.breakpoints.down('sm')]: {
            display: "block",
            position: "fixed",
            top: "95%",
            left: "90%",
            transform: "translate(-90%, -95%)"
        },
    }
});

class FloatingActionButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dilogeOpen: false,
            userId: "",
            signInOpen: false,
            signIn: false
        }
    }
    onAuthStateChanged = () => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userId: user.uid
                })
            } else {
                // No user is signed in.
            }
        });
    }

    handleClickOpen = () => {
        if (!this.state.userId) {
            this.setState({
                signInOpen: true,
                signIn: true
            })
        } else {
            this.setState({
                open: true,
                dilogeOpen: true,
            })
        }
    }

    handleClose = () => {
        if (!this.state.userId) {
            this.setState({
                signInOpen: false
            })
            setTimeout(() => {
                this.setState({
                    signIn: false
                })
            }, 1000)
        }
        this.setState({
            open: false
        })
        setTimeout(() => {
            this.setState({
                dilogeOpen: false
            })
        }, 1000)
    }

    componentWillMount() {
        this.onAuthStateChanged()
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.fixed} >
                <Fab onClick={this.handleClickOpen} size="medium" aria-label="add" className={classes.fab}>
                    Sell
            </Fab>
                {this.state.dilogeOpen ?
                    <FullScreenDialog handleClose={this.handleClose} open={this.state.open} />
                    : null}
                {this.state.signIn ?
                    <SignInModel handleClose={this.handleClose} signInOpen={this.state.signInOpen} signIn={"signIn"} />
                    : null}
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(FloatingActionButtons))