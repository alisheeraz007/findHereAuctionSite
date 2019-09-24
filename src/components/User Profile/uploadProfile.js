import { Upload, Icon, message } from 'antd';
import React from 'react'
import firebase from 'firebase'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const styles = theme => ({
})

class Avatar extends React.Component {
    state = {
        loading: false,
        matchFount: false
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            firebase.storage().ref(`postImages/images/${this.props.userId}`).put(info.file.originFileObj)
                .then(() => {
                    getBase64(info.file.originFileObj, imageUrl =>
                        this.setState({
                            imageUrl,
                            loading: false,
                        }, () => {
                        }),
                    );
                })
        }
    };

    componentWillUpdate(){
        if(!this.state.matchFount){
            if(this.props.images.length){
                console.log(this.props.images)
                this.setState({
                    matchFount: true
                })
            }
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
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

const matchDispatchToProps = {}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(withRouter(Avatar)));
