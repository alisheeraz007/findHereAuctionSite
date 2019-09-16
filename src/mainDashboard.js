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
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    logo: {
        color: "Black",
        fontWeight: "bolder",
        fontFamily: "serif",
        [theme.breakpoints.down('sm')]: {
            fontSize: "20px",
        },
    },
    selectParent: {
        width: "30%",
        marginLeft: 20,
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
        marginLeft: "30%",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    Links: {
        float: "right",
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
                        <Typography variant="h6" color="inherit" className={classes.selectParent} >
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
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {["America", "Austrailia", "Bangladesh",
                                    "China", "India", "Pakistan",
                                    "Turkey", "Zimbabwe"].map((city, index) => {
                                        return (
                                            <Option key={index} value={city}>{city}</Option>
                                        )
                                    })}
                            </Select>
                        </Typography>
                        <Typography className={classes.LinksParent}>
                            <table className={classes.Links}>
                                <tbody>
                                    <tr>
                                        <td><button>Home</button></td>
                                        <td><button>About Us</button></td>
                                        <td><button>Categories</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Typography>
                    </Toolbar>
                </AppBar>

                <main className={classes.content}>

                    <div className={classes.toolbar} />
                    <div>
                    </div>
                </main>
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
