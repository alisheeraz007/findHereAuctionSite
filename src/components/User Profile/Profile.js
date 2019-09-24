import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import { Select, Icon, Button, } from 'antd';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom'
import AppBar from '../../AppBar';
import FloatingActionButtons from '../commonComponents/RoundButton';
import cover from '../../Images/online-auctions.png'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom'
import Avatar from './uploadProfile'

const { Option } = Select;

const drawerWidth = 240;

const styles = theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    root: {
        display: 'flex',
    },
    mainBody: {
        marginTop: "2%",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        padding: "5px",
        justifyContent: "center",
        border: "2px solid rgba(0,0,0,0.2)",
        // marginTop: "5px",
        borderRadius: "5px",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        background: "#8080800f",
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing.unit * 1,
        },
    },
    content2: {
        background: "black",
        height: "20vh"
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
            width: "42%",
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
        backgroundSize: "contain",
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
        textAlign: "center",
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
    mainn: {
        position: "absolute",
        width: "100%",
    },
    profileImg: {
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        [theme.breakpoints.down('lg')]: {
            height: "51vh",
            width: "100%",
            borderRadius: "5px",
        },
        [theme.breakpoints.down('md')]: {
            height: "51vh",
            width: "100%",
            borderRadius: "5px",
        },
        [theme.breakpoints.down('sm')]: {
            height: "20vh",
            width: "100%",
            borderRadius: "5px",
        },
    },
    profileImgRadius: {
        overflow: "hidden",
        textAlign: "center",
        [theme.breakpoints.down('lg')]: {
            background: "white",
            width: "300px",
            height: "300px",
            marginTop: "13px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "50%",
        },
        [theme.breakpoints.down('md')]: {
            background: "white",
            width: "300px",
            height: "300px",
            marginTop: "13px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "50%",
        },
        [theme.breakpoints.down('sm')]: {
            background: "white",
            width: "110px",
            height: "110px",
            marginTop: "8px",
            marginLeft: "16px",
            borderRadius: "50%",
        },
    },
    profileMainBody: {
        width: "100%",
        border: "2px solid rgba(0,0,0,0.2)",
        marginTop: "5px",
        borderRadius: "5px",
    },
    edit: {
        width: "100%",
        height: "25%",
        position: "relative",
        top: "100%",
        transform: "translate(0,-100%)",
        textAlign: "center",
        fontSize: "30px",
        fontWeight: "bold",
        marginTop: "20px",
        fontFamily: "cursive",
        [theme.breakpoints.down('sm')]: {
            fontSize: "16px",
            marginTop: 0,
            top: "96%"
        },
    },
    span: {
        width: "50px",
        height: "50px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "50%",
        backgroundColor: "rgba(0,0,0,0.5)",
        [theme.breakpoints.down('sm')]: {
            width: "30px",
            height: "30px",
            marginLeft: "auto",
            marginRight: "auto",
        },
    }
});

class Profile extends React.Component {
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

    card = (name, Category, id, entryNo, price) => {
        // console.log(camera)
        const { classes } = this.props;
        const match = this.props.match
        return (
            <Card className={classes.card}>
                <Link to={`${match.url}/${entryNo}`}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={name}
                            title="Contemplative Reptile"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.Category}>
                                {Category} ({price})
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        )
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
            <div className={classes.mainn}>
                <AppBar />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Paper>
                        <div style={{ height: "5vh" }}>

                        </div>
                    </Paper>
                    <Paper className={classes.mainBody}>
                        <div className={classes.profileImg}>
                            <div className={classes.profileImgRadius}>
                                <Avatar userId={this.state.userId} />
                            </div>
                        </div>
                        <div className={classes.mainBody}>
                            <h6 style={{ width: "100%" }}>Your Posted Product</h6>
                            {Object.values(this.props.posts).map((item, index) => {
                                return (
                                    item.uid === this.state.userId ?
                                        this.props.images.map((img) => {
                                            return (
                                                img.name === item.fileList[0].name ?
                                                    // console.log(item.productName, )
                                                    this.card(img.url, item.productName, classes, item.entryNo, item.price)
                                                    : null
                                            )
                                        })
                                        : null
                                )
                            })}
                        </div>
                    </Paper>
                </main>
                <FloatingActionButtons />
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    let posts = {}
    let images = []
    if (state) {
        if (state.posts) {
            posts = state.posts
        }
        if (state.images) {
            images = state.images
        }
    }
    return {
        posts: posts,
        state,
        images: images
    }
}

const matchDispatchToProps = {}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(withRouter(Profile)));
