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
    headerBut: {
        background: "transparent",
        border: 0,
        cursor: "pointer",
        width: 100,
        '&:hover': {
            outline: "none",
            color: "#797171",
        },
    },
    dropDown: {
        position: "fixed",
        zIndex: 1160
    }
});

class MainDashBoad extends React.Component {
    state = {
        city: ""
    };

    gettingValues = (name, value) => {
        this.setState({
            [name]: value
        }, () => {
            // console.log(this.state.city)
        })
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
                        <div variant="h6" color="inherit" className={classes.selectParent} >
                            <Select
                                showSearch
                                className={classes.selectCountry}
                                placeholder="Select Country"
                                optionFilterProp="children"
                                name="city"
                                onChange={(ev) => this.gettingValues("city", ev)}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                                // onSearch={onSearch}
                                dropdownClassName={classes.dropDown}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {["Abtabad", "Bhawalpul", "Cholistan",
                                    "Faisalabad", "Hyderabad", "Islamabad", "Karachi",
                                    "Lahore", "Multan", "Sialkot"].map((city, index) => {
                                        return (
                                            <Option key={index} value={city}>{city}</Option>
                                        )
                                    })}
                            </Select>
                        </div>
                        <div className={classes.Links}>
                            <button className={classes.headerBut}>
                                Login
                            </button>
                        </div>
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

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(MainDashBoad));
