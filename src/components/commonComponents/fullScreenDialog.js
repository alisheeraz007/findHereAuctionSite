import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import MainDashBoad from '../../AppBar'
import { Select, Input, Radio, DatePicker, Button } from 'antd';
import { connect } from 'react-redux'
import firebase from 'firebase'
import PicturesWall from './uploadImg';
// import { add } from '../../actions/action';

const { Option } = Select;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
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
    formDiv: {
        width: "100%",
        textAlign: "center"
    },
    selectCountry: {
        // border: "1px solid #797171",
        [theme.breakpoints.down('lg')]: {
            width: "50% !important",
        },
        [theme.breakpoints.down('md')]: {
            width: "60% !important",
        },
        [theme.breakpoints.down('sm')]: {
            width: "100% !important",
        },
    },
    addFetails: {
        padding: "13px",
        fontSize: "30px",
        color: "#797171",
        fontWeight: "bold"
    },
    Radio: {
        paddingRight: "15px",
        fontWeight: "bold",
        fontSize: "16px",
        color: "#797171",
    },
    datePicker: {
        [theme.breakpoints.down('lg')]: {
            background: "transparent",
            padding: "4px",
            borderRadius: "4px",
            fontFamily: "cursive",
            color: "#797171",
            width: "20%"
        },
        [theme.breakpoints.down('sm')]: {
            background: "transparent",
            padding: "4px",
            borderRadius: "4px",
            fontFamily: "cursive",
            color: "#797171",
            width: "20%"
        },
        [theme.breakpoints.down('sm')]: {
            background: "transparent",
            padding: "4px",
            borderRadius: "4px",
            fontFamily: "cursive",
            color: "#797171",
            width: "43%"
        }
    },
    Upload: {
        border: "1px solid #bfbfbf6e",
        padding: "10px",
        borderRadius: "5px",
        [theme.breakpoints.down('lg')]: {
            width: "50% !important",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
        },
        [theme.breakpoints.down('md')]: {
            width: "60% !important",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
        },
        [theme.breakpoints.down('sm')]: {
            width: "100% !important",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
        },
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            openDate: true,
            loading: false,
            category: "",
            productName: "",
            condition: "",
            validTill: "",
            description: "",
            price: "",
            fileList: []
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

    gettingImgUrl = (fileList) => {
        if (this.state.fileList.length !== fileList.length) {
            this.setState({
                fileList: fileList
            }, () => {
                console.log(this.state.fileList)
            })
        }
    }

    gettingValues = (name, value) => {
        // console.log(this.state.matchArray)
        this.setState({
            [name]: value
        })
    }

    onChange = (name, ev) => {
        // console.log(this.state.matchArray)
        this.setState({
            [name]: ev.target.value
        })
    }

    makingLength_2 = (value, miliseconds) => {
        if (miliseconds === "miliseconds") {
            value = value.toString()
            let correctValue = value.length === 1 ? "00" + value : value.length === 2 ? "0" + value : value
            // console.log(correctValue)
            return correctValue

        } else {

            value = value.toString()
            let correctValue = value.length === 1 ? "0" + value : value
            // console.log(correctValue)
            return correctValue
        }
    }

    entryNo = () => {
        let d = new Date()
        let year = d.getFullYear()
        let month = this.makingLength_2(d.getMonth() + 1)
        let date = this.makingLength_2(d.getDate())
        let hours = this.makingLength_2(d.getHours())
        let mintues = this.makingLength_2(d.getMinutes())
        let seconds = this.makingLength_2(d.getSeconds())
        let miliSeconds = this.makingLength_2(d.getMilliseconds(), "miliseconds")
        let entryNo = year.toString() + month.toString() + date.toString() + hours.toString() + mintues.toString() + seconds.toString() + miliSeconds.toString()
        // console.log(entryNo)
        return entryNo

    }

    post = () => {
        this.setState({
            loading: true,
        })
        let obj = {
            category: this.state.category,
            productName: this.state.productName,
            condition: this.state.condition,
            validTill: this.state.validTill,
            description: this.state.description,
            entryNo: this.entryNo(),
            uid: this.state.userId,
            fileList: this.state.fileList,
            price: this.state.price
        }
        firebase.database().ref("wholeData").child("posts").child(obj.entryNo).set(obj)
            .then((res) => {
                firebase.database().ref("wholeData").child("users").child(this.state.userId)
                    .child("posts").child(obj.entryNo).set(obj)
                    .then((res) => {
                        // this.props.add(obj, "posts")
                        for (let i = 0; i < this.state.fileList.length; i++) {
                            firebase.storage().ref(`postImages/images/${this.state.fileList[i].name}`).put(this.state.fileList[i].originFileObj)
                        }
                        this.setState({
                            loading: false
                        })
                        this.props.handleClose()
                    })
            })
    }

    componentWillMount() {
        this.onAuthStateChanged()
    }

    render() {
        const { classes } = this.props
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        console.log(this.props)
        return (
            <div className={classes.media}>
                <Dialog fullScreen open={this.props.open} onClose={this.props.handleClose} TransitionComponent={Transition}>
                    <MainDashBoad post={this.post} postingForm={true} handleClose={this.props.handleClose} />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <div className={classes.formDiv}>
                            <div className={classes.addFetails}>Add Details.</div>
                            <form>
                                <Select
                                    size="large"
                                    showSearch
                                    className={classes.selectCountry}
                                    // value={this.state.category}
                                    placeholder="Search Category"
                                    optionFilterProp="children"
                                    name="category"
                                    required
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
                                <br />
                                <br />
                                <Input
                                    className={classes.selectCountry}
                                    size="large"
                                    placeholder="Product Name"
                                    name="productName"
                                    required
                                    onChange={(ev) => this.onChange("productName", ev)}
                                />
                                <br />
                                <br />
                                <div className={classes.Upload}>
                                    <span className={classes.Radio}>Condition ?</span>
                                    <Radio.Group required onChange={(ev) => this.gettingValues("condition", ev.target.value)} value={this.state.condition}>
                                        <Radio value="new">New</Radio>
                                        <Radio value="used">Used</Radio>
                                    </Radio.Group>
                                    <br />
                                    <br />
                                    <span className={classes.Radio}>Valid Till ?</span>
                                    <input
                                        type="date"
                                        className={classes.datePicker}
                                        required
                                        onChange={(ev) => this.onChange("validTill", ev)}
                                    />
                                    <br />
                                    <br />
                                    <span className={classes.Radio}>Price</span>
                                    <Input
                                        type="number"
                                        className={classes.selectCountry}
                                        size="large"
                                        placeholder="Price"
                                        name="price"
                                        onChange={(ev) => this.onChange("price", ev)}
                                        required
                                    />
                                </div>
                                <br />
                                <TextArea
                                    className={classes.selectCountry}
                                    size="large"
                                    value={this.state.description}
                                    onChange={(ev) => this.onChange("description", ev)}
                                    placeholder="Describe Your Product"
                                    autosize={{ minRows: 3, maxRows: 5 }}
                                    required
                                />
                                <br />
                                <br />
                                <div className={classes.Upload}>
                                    <span className={classes.Radio}>Upload Images: </span>
                                    <br />
                                    <br />
                                    <PicturesWall gettingImgUrl={this.gettingImgUrl} />
                                </div>
                                <br />
                                <br />
                                <Button type="primary" loading={this.state.loading} onClick={this.post}>
                                    Post
        </Button>
                            </form>
                        </div>
                    </main>
                </Dialog>
            </div >
        );
    }
}


const mapStateToProps = (state) => {
    // console.log(state)
    return {
        state
    }
}

// const matchDispatchToProps = { add }

export default withStyles(styles)(connect(mapStateToProps)(withRouter(FullScreenDialog)))