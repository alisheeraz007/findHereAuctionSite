import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../AppBar'
import FloatingActionButtons from '../commonComponents/RoundButton'
import { Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { withRouter, Link, Route } from 'react-router-dom'
import { postImg } from '../../actions/action';
import firebase from 'firebase'
import { card } from '../commonComponents/card';

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
        justifyContent: "center"
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
    }
});


class Cameras extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            setIndex: 0,
            direction: null,
            setDirection: null,
            topicId: ""
        }
    }
    handleSelect = (selectedIndex, e) => {
        this.setState({
            index: selectedIndex,
            setIndex: selectedIndex,
            direction: e.direction,
            setDirection: e.direction
        })
    };

    card = (name, Category, id, entryNo,price) => {
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

    componentWillMount() {
        if (this.props.match.params.topicId) {
            if (!this.state.topicId) {
                this.setState({
                    topicId: this.props.match.params.topicId
                }, () => {
                    // console.log(this.state.topicId)
                })
            }
        }

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
                        {Object.values(this.props.posts).map((item, index) => {
                            return (
                                item.category === "Camera" ?
                                    this.props.images.map((img) => {
                                        return (
                                            img.name === item.fileList[0].name ?
                                                // console.log(item.productName, )
                                                this.card(img.url, item.productName,classes, item.entryNo,item.price)
                                                
                                                : null
                                        )
                                    })
                                    : null
                            )
                        })}
                    </Paper>
                </main>
                <FloatingActionButtons />
            </div >
        );
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

const mapDispatchToProps = { postImg }

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Cameras)));