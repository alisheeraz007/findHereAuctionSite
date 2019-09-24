import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { tr } from 'date-fns/esm/locale';
import firebase from 'firebase';
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import { Select } from 'antd';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import SignInModel from './components/commonComponents/SignInModel';
import profile from './Images/camera.jpg'
import LongMenu from './components/commonComponents/menuItems';
import { withRouter } from 'react-router-dom'

const { Option } = Select;

const drawerWidth = 240;

const styles = theme => ({
    mainApp: {
        background: "#d3d3d7",
    },
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    logo: {
        color: "#797171",
        fontWeight: "bolder",
        fontFamily: "inherit",
        [theme.breakpoints.down('sm')]: {
            fontSize: "20px",
        },
    },
    selectParent: {
        [theme.breakpoints.down('lg')]: {
            width: "30%",
            marginLeft: 20,
        },
        [theme.breakpoints.down('md')]: {
            width: "20%",
            marginLeft: 20,
        },
        [theme.breakpoints.down('sm')]: {
            width: "50%",
            marginLeft: 10,
        },
    },
    selectCountry: {
        width: "100%",
    },
    header: {
        zIndex: 0
    },
    LinksParent: {
        [theme.breakpoints.down('lg')]: {
            marginLeft: "30%",
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: "20%",
        },
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    Links: {
        [theme.breakpoints.down('lg')]: {
            position: "absolute",
            left: "90%",
            transform: "translate(-90%, 0)"
        },
        [theme.breakpoints.down('md')]: {
            position: "absolute",
            left: "90%",
            transform: "translate(-90%, 0)"
        },
        [theme.breakpoints.down('sm')]: {
            position: "absolute",
            left: "99%",
            transform: "translate(-90%, 0)"
        },
    },
    postingForm: {
        [theme.breakpoints.down('lg')]: {
            position: "absolute",
            left: "90%",
            transform: "translate(-90%, 0)"
        },
        [theme.breakpoints.down('md')]: {
            position: "absolute",
            left: "90%",
            transform: "translate(-90%, 0)"
        },
        [theme.breakpoints.down('sm')]: {
            position: "relative",
            left: "70%",
            transform: "translate(-70%, 0)",
        },
    },
    headerBut: {
        background: "transparent",
        border: 0,
        cursor: "pointer",
        right: "15%",
        position: "relative",
        transform: "translate(-15 %, 0)",
        '&:hover': {
            outline: "none",
            color: "#797171",
        },
        '&:focus': {
            outline: "none",
        },
    },
    headerBut2: {
        background: "transparent",
        border: 0,
        cursor: "pointer",
        right: "15%",
        position: "relative",
        marginLeft: 5,
        transform: "translate(-15 %, 0)",
        '&:hover': {
            outline: "none",
            color: "#797171",
        },
        '&:focus': {
            outline: "none",
        },
    },
    dropDown: {
        position: "fixed",
        zIndex: 1160
    },
    profile: {
        left: "95%",
        width: "40px",
        position: "absolute",
        transform: "translate(-90%, 0)",
        height: "40px",
        borderRadius: "50%",
        backgroundImage: `url(${profile})`,
        backgroundSize: "contain",
    }
});

class MainDashBoad extends React.Component {
    state = {
        city: "",
        signIn: false,
        userId: ""
    };

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

    gettingValues = (name, value) => {
        this.setState({
            [name]: value
        }, () => {
            // console.log(this.state.city)
        })
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

    userProfile = () => {
        this.props.history.push("/myProfile")
    }

    componentWillMount() {
        this.onAuthStateChanged()
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classes.mainApp}
                >
                    <Toolbar className={classes.header}>
                        <Typography variant="h5" color="inherit" className={classes.logo}>
                            Find Here
            </Typography>
                        {!this.props.postingForm ?
                            <div variant="h6" color="inherit" className={classes.selectParent} >
                                <Select
                                    showSearch
                                    className={classes.selectCountry}
                                    placeholder="Select Country"
                                    optionFilterProp="children"
                                    name="city"
                                    // value={this.state.city}
                                    onChange={(ev) => this.gettingValues("city", ev)}
                                    // onFocus={onFocus}
                                    // onBlur={onBlur}
                                    // onSearch={onSearch}
                                    dropdownClassName={classes.dropDown}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {["All", "Abtabad", "Bhawalpul", "Cholistan",
                                        "Faisalabad", "Hyderabad", "Islamabad", "Karachi",
                                        "Lahore", "Multan", "Sialkot"].map((city, index) => {
                                            return (
                                                <Option key={index} value={city}>{city}</Option>
                                            )
                                        })}
                                </Select>
                            </div>
                            : null}
                        {!this.props.postingForm && !this.state.userId ?
                            <div className={classes.Links}>
                                <button
                                    onClick={this.handleClickOpen}
                                    className={classes.headerBut}
                                >
                                    Login
                            </button>
                                {this.state.signIn ?
                                    <SignInModel handleClose={this.handleClose} signInOpen={this.state.signInOpen} signIn={"signIn"} />
                                    : null}
                            </div>
                            :
                            !this.props.postingForm && this.state.userId ?
                                <div className={classes.profile} onClick={this.userProfile}>

                                </div>
                                :
                                <div className={classes.postingForm}>
                                    <button className={classes.headerBut2} onClick={this.props.post}>
                                        Post
                            </button>
                                    <IconButton className={classes.headerBut2} edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

MainDashBoad.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        state
    }
}

const matchDispatchToProps = {}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(withRouter(MainDashBoad)));
