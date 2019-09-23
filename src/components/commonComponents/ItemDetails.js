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
import CommentBox from './commentBox';

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
    },
    carousel: {
        background: "black",
        textAlign: "center",
        [theme.breakpoints.down('lg')]: {
            height: "55vh",
            width: "70%",
            marginRight: "auto"
        },
        [theme.breakpoints.down('md')]: {
            height: "55vh",
            width: "70%",
            marginRight: "auto"
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
    },
    des: {
        [theme.breakpoints.down('lg')]: {
            height: "96%",
            width: "28%"
        },
        [theme.breakpoints.down('md')]: {
            height: "96%",
            width: "28%"
        },
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    price: {
        height: "62%",
        border: "2px solid #d3d3d7",
        padding: "10px"
    },

    description: {
        height: "36%",
        border: "2px solid #d3d3d7",
        marginTop: "20px",
        padding: "10px"
    },
    main2: {
        display: "flex",
        width: "100%",
    },
    commentBox: {
        border: "2px solid #d3d3d7",
        position: "relative",
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
        marginTop: "20px",
        padding: "10px",
        paddingBottom: 0,
        borderRadius: "5px",
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

    date = (entryNo) => {
        let date;
        date = entryNo.slice(0, 4) + "-" + entryNo.slice(4, 6) + "-" + entryNo.slice(6, 8)
        return date
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
                let obj = Object.values(this.props.state.posts).find((obj) => {
                    return obj.entryNo === this.state.topicId
                })
                this.setState({
                    obj,
                    matchFound: true
                })
            }
        }
    }

    render() {
        const { classes } = this.props;
        // console.log(this.state.obj)
        return (
            this.state.obj ?
                <div className={classes.mainn}>
                    <AppBar />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Paper>
                            <div style={{ height: "5vh" }}>

                            </div>
                        </Paper>
                        <Paper className={classes.mainBody}>
                            <div className={classes.main2}>
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
                                <div className={classes.des}>
                                    <div className={classes.price}>
                                        <p style={{ fontSize: "25px", fontWeight: "bold" }}>Starting Price: {this.state.obj.price}</p>
                                        <p style={{ color: "#797171", fontSize: "18px" }}><span style={{ fontWeight: "bold", color: "black", marginRight: 5 }}>Product name: </span> {this.state.obj.productName}.</p>
                                        <p style={{ color: "#797171", fontSize: "18px", marginBottom: 0 }}><span style={{ fontWeight: "bold", color: "black", marginRight: 5 }}>Condition: </span> {this.state.obj.condition}.</p>
                                        <p style={{ color: "#797171", fontSize: "14px", float: "right", marginBottom: 0 }}>Posted On: {this.date(this.state.topicId)}</p><br />
                                        <p style={{ color: "#797171", fontSize: "14px", float: "right", marginBottom: 0 }}>Posted By: {this.props.state.users[this.state.obj.uid].firstName} {this.props.state.users[this.state.obj.uid].lastName}</p><br />
                                        <p style={{ color: "#797171", fontSize: "14px", float: "right" }}>Valid Till: {this.state.obj.validTill}</p>
                                    </div>
                                    <div className={classes.description}>
                                        <h6 style={{ fontSize: "18px", fontWeight: "bold" }}> Description</h6>
                                        <div style={{ color: "#797171" }}>
                                            {this.state.obj.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.commentBox}>
                                <CommentBox postImages={this.props.postImages} topicId={this.state.topicId} obj={this.state.obj} />
                            </div>
                        </Paper>
                    </main>
                    <FloatingActionButtons />
                </div >
                : null
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