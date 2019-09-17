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
import MainDashBoad from '../AppBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AirConditioners from '../Images/airConditioners.jpg'
import Mobile from '../Images/mobiless.jpg'
import Camera from '../Images/camera.jpg'
import Computer from '../Images/computers.png'
import Refrigrators from '../Images/refrigratorsss.jpg'
import Generators from '../Images/genetors.png'
import Games from '../Images/Games.jpg'
import Speakers from '../Images/speakers.jpg'
import ControlledCarousel from './commonComponents/slider'
import {withRouter} from 'react-router-dom'
import FloatingActionButtons from './commonComponents/RoundButton';

const { Option } = Select;


const styles = theme => ({
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
        background: "#8080800f",
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing.unit * 1,
        },
    },
    sliderDiv: {
        width: "100%",
        height: "55vh",
        [theme.breakpoints.down('sm')]: {
            height: "25vh"
        },
    },
    mainBody: {
        marginTop: "2%",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        padding: "5px",
        justifyContent: "center"
    },
    card: {
        [theme.breakpoints.down('lg')]: {
            width: "30%",
            margin: "20px",
            height: "35vh",
        },
        [theme.breakpoints.down('md')]: {
            width: "28%",
            margin: "20px",
            height: "35vh",
        },
        [theme.breakpoints.down('sm')]: {
            width: "44%",
            margin: "10px",
            height: "20vh",
        },
    },
    categoryHead: {
        [theme.breakpoints.down('lg')]: {
            textAlign: "right",
            fontSize: "25px",
            padding: "15px",
            fontWeight: "bold",
            color: "darkgray",
            width: "100%"
        },
        [theme.breakpoints.down('md')]: {
            textAlign: "right",
            fontSize: "20px",
            padding: "5px",
            fontWeight: "bold",
            color: "darkgray",
            width: "100%"
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: "left",
            fontSize: "20px",
            padding: "5px",
            fontWeight: "bold",
            color: "darkgray",
            width: "100%"
        },
    },
    media: {
        [theme.breakpoints.down('lg')]: {
            height: 173,
        },
        [theme.breakpoints.down('md')]: {
            height: 173,
        },
        [theme.breakpoints.down('sm')]: {
            height: 96,
        },
    },
    Category: {
        fontWeight: "bold",
        color: "#645d5d",
        [theme.breakpoints.down('lg')]: {
            fontSize: 20,
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 20,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
    cardContent: {
        padding: 8
    },
    selectCountry: {
        [theme.breakpoints.down('lg')]: {
            width: "30%",
            marginLeft: 20,
            marginRight: 50,
        },
        [theme.breakpoints.down('md')]: {
            width: "30%",
            marginLeft: 20,
            marginRight: 50,
        },
        [theme.breakpoints.down('sm')]: {
            width: "41%",
            margin: 0,
            marginLeft: "15px",
        },
    },
});

class Home extends React.Component {
    state = {
        category: "All",
        Catogries: [
            { name: "Air Conditioners", image: AirConditioners, route: "home/airconditioners" },
            { name: "Camera", image: Camera, route: "home/cameras" },
            { name: "Computers", image: Computer, route: "home/computers" },
            { name: "Mobiles", image: Mobile, route: "home/mobiles" },
            { name: "Refrigrators", image: Refrigrators, route: "home/refregirators" },
            { name: "Generators & UPS", image: Generators, route: "home/generators&ups" },
            { name: "Games", image: Games, route: "home/games" },
            { name: "Audio", image: Speakers, route: "home/audio" },
        ],
        matchArray: []
    };

    gettingValues = (name, value) => {
        // console.log(this.state.matchArray)
        this.setState({
            [name]: value
        }, () => {
            this.setState({
                matchArray: this.filter(this.state.category, this.state.Catogries)
            }, () => {
            })
            if (this.state.filter === null || this.state.filter === "") {
                this.setState({
                    matchArray: []
                })
            }
        })
    }

    filter = (value, wholeData) => {
        // console.log(wholeData)
        // console.log(value)
        return wholeData.filter(obj => {
            const regex = new RegExp(value, "gi")
            // console.log(name.userName.match(regex))
            if (obj.name.match(regex)) {
                return obj.name.match(regex)
            }
        })
    }

    push = (route) => {
        this.props.history.push(route)
        // console.log(this.props)
    }

    card = (name, Category, route) => {
        // console.log(camera)
        const { classes } = this.props;
        return (
            <Card className={classes.card} onClick={() => this.push(route)}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={name}
                        title="Contemplative Reptile"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.Category}>
                            {Category}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MainDashBoad />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Paper className={classes.sliderDiv}>
                        <ControlledCarousel />
                    </Paper>
                    <Paper className={classes.mainBody}>
                        <Typography className={classes.categoryHead} variant="h4" color="inherit">
                            Choose Category
                            <Select
                                showSearch
                                className={classes.selectCountry}
                                value={this.state.category}
                                placeholder="Search Category"
                                optionFilterProp="children"
                                name="category"
                                onChange={(ev) => this.gettingValues("category", ev)}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {["All", "Air Conditioners", "Camera",
                                    "Computers", "Mobiles", "Refrigrators",
                                    "Generators & UPS", "Games", "Audio"].map((category, index) => {
                                        return (
                                            <Option key={index} value={category}>{category}</Option>
                                        )
                                    })}
                            </Select>
                        </Typography>
                        {!this.state.matchArray.length ?
                            this.state.Catogries.map((obj) => {
                                return (
                                    this.card(obj.image, obj.name, obj.route)
                                )
                            })
                            :
                            this.state.matchArray.map((obj) => {
                                return (
                                    this.card(obj.image, obj.name, obj.route)
                                )
                            })
                        }
                    </Paper>
                    <FloatingActionButtons/>
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

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(withRouter(Home)));
