import { Upload, Icon, Modal } from 'antd';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const styles = theme => ({
    upload: {
        [theme.breakpoints.down('lg')]: {
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%"            
        },
    }
});

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        }, () => {
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList },()=>{
        this.props.gettingImgUrl(this.state.fileList)
        // console.log(this.state.fileList)
    });

    render() {
        // console.log(this.state)
        const { classes } = this.props
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix" className={classes.upload}>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(PicturesWall)