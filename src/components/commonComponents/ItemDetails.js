import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../AppBar'
import { Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { withRouter, Link, Route } from 'react-router-dom'
import FloatingActionButtons from './RoundButton'
import { postImg } from '../../actions/action'
import firebase from 'firebase'
import Carousel from 'react-bootstrap/Carousel';

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
        height: "100vh",
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
        height: "100vh",
    },
    carousel: {
        background: "black",
        textAlign: "center",
        [theme.breakpoints.down('lg')]: {
            height: "55vh",
            width: "60%",
            marginRight: "auto"
        },
        [theme.breakpoints.down('md')]: {
            height: "55vh",
            width: "100%",
        },
        [theme.breakpoints.down('sm')]: {
            height: "25vh",
            width: "100%",            
        },
    },
    img: {
        [theme.breakpoints.down('lg')]: {
            height: "55vh",
            width: "50%"
        },
        [theme.breakpoints.down('md')]: {
            height: "55vh",
        },
        [theme.breakpoints.down('sm')]: {
            height: "25vh",
        },
    }
});


class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            setIndex: 0,
            direction: null,
            setDirection: null,
            topicId: "",
            matchFound: false
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

    card = (name, Category, id) => {
        // console.log(camera)
        const { classes } = this.props;
        const match = this.props.match
        return (
            <Card className={classes.card}>
                <Link to={`${match.url}/${id}`} >
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
                </Link>
            </Card>
        )
    }

    gettingPostImages = (entryNo) => {
        if (this.props.state.posts) {
            let posts = Object.values(this.props.state.posts);
            let postsImges = []
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].entryNo === entryNo) {
                    for (let j = 0; j < posts[i].fileList.length; j++) {
                        firebase.storage().ref(`postImages/images/${posts[i].fileList[j].name}`).getDownloadURL()
                            .then((url) => {
                                // console.log()
                                postsImges.push({ name: posts[i].fileList[j].name, url: url })
                                this.props.postImg(postsImges)
                            })
                    }
                }
            }
        }
    }

    async componentWillMount() {
        if (!this.state.topicId) {
            this.setState({
                topicId: this.props.match.params.topicId
            })
        }
        await this.gettingPostImages(this.props.match.params.topicId)
    }

    componentWillUpdate() {
        if (!this.state.matchFound) {
            if (this.props.state.posts) {
                this.gettingPostImages(this.props.match.params.topicId)
                this.setState({
                    matchFound: true
                })
            }
        }
    }

    render() {
        const { classes } = this.props;
        console.log(this.props)
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
                        {this.props.postImages.length ?
                            <Carousel className={classes.carousel}>
                                {this.props.postImages.map((obj) => {
                                    return (
                                        <Carousel.Item>
                                            <img
                                                className={classes.img}
                                                src={obj.url}
                                                alt="First slide"
                                            />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                            : null}
                    </Paper>
                </main>
                <FloatingActionButtons />
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    let postImages = []
    if (state) {
        if (state.postImages) {
            postImages = state.postImages
        }
    }
    return {
        postImages: postImages,
        state
    }
}

const mapDispatchToProps = { postImg }

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemDetails)));