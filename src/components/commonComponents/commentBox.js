import React from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment'
import { connect } from 'react-redux'
import { withRouter, Link, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase'
import { postImg } from '../../actions/action';

const { TextArea } = Input;

// const moment = require('moment')

const styles = theme => ({
})

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
      </Button>
        </Form.Item>
    </div>
);

class CommentBox extends React.Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
    };

    onAuthStateChanged = () => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userId: user.uid
                }, () => {

                })
            } else {
                // No user is signed in.
            }
        });
    }

    componentWillUpdate() {
        if (!this.state.matchFound) {
            if (this.props.state.posts) {
                let comments = []
                let allComments = []
                if (this.props.state.posts[this.props.topicId].comments) {
                    allComments = Object.values(this.props.state.posts[this.props.topicId].comments)
                    // console.log(allComments)
                }
                for (let i = 0; i < allComments.length; i++) {
                    let date2 = moment(allComments[i].datetime).fromNow()
                    let obj = {
                        author: allComments[i].firstName + "" + allComments[i].lastName,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{allComments[i].comment}</p>,
                        datetime: date2
                    }
                    comments.push(obj)
                }
                if (comments.length === allComments.length) {
                    this.setState({
                        comments,
                        matchFound: true
                    })
                }
            }
        }
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

    handleSubmit = (entryNo) => {
        if (!this.state.value) {
            return;
        }
        let posts = Object.values(this.props.state.posts);
        let postsImges = []
        this.setState({
            submitting: true,
        });
        let d = new Date()
        let year = this.entryNo().slice(0, 4)
        let month = this.entryNo().slice(4, 6)
        let date = this.entryNo().slice(6, 8)
        let hours = this.entryNo().slice(8, 10)
        let min = this.entryNo().slice(10, 12)
        let sec = this.entryNo().slice(12, 14)
        let newDate = year + "-" + month + "-" + date + "T" + hours + ":" + min + ":" + sec
        let obj1 = {
            userId: this.state.userId,
            comment: this.state.value,
            entryNo: this.entryNo(),
            firstName: this.props.state.users[this.state.userId].firstName,
            lastName: this.props.state.users[this.state.userId].lastName,
            datetime: newDate,
        }
        let obj = this.props.obj
        obj.comments = { ...obj.comments, [obj1.entryNo]: obj1 }
        firebase.database().ref("wholeData").child("users")
            .child(this.state.userId).child("posts")
            .child(this.props.topicId).set(obj)
            .then((res) => {
                firebase.database().ref("wholeData").child("posts")
                    .child(this.props.topicId).set(obj)
                    .then((res) => {
                        let amout = {
                            advance: Number(this.props.obj.price) / 10,
                            name: obj1.firstName + " " + obj1.lastName,
                            entryNo: obj1.entryNo
                        }
                        firebase.database().ref("wholeData").child("middleMan")
                            .child(obj1.entryNo).set(amout)

                        for (let i = 0; i < posts.length; i++) {
                            if (posts[i].entryNo === entryNo) {
                                for (let j = 0; j < posts[i].fileList.length; j++) {
                                    firebase.storage().ref(`postImages/images/${posts[i].fileList[j].name}`).getDownloadURL()
                                        .then((url) => {
                                            postsImges.push({ name: posts[i].fileList[j].name, url: url })
                                            this.props.postImg(postsImges)
                                        })
                                }
                            }
                        }
                        this.setState({
                            submitting: false,
                            value: '',
                            matchFound: false
                        });
                    })
            })
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    componentWillMount() {
        this.onAuthStateChanged()
    }

    render() {
        const { comments, submitting, value } = this.state;
        // console.log(comments)
        return (
            <div>
                <h2>Bidding Box</h2>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={() => this.handleSubmit(this.props.topicId)}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentBox)));