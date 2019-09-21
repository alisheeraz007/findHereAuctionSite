import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { withRouter } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Input, Tooltip, Icon, Select, message } from 'antd';
import firebase from 'firebase'
import { capitalizeFirstLetters } from '../../common';

const success = (messaage) => {
    message.success(messaage);
};

const error = (messaage) => {
    message.error(messaage);
};

const { Option } = Select;

const styles = themes => ({
    butt: {
        color: "red",
    },
    extra: {
        textAlign: "center",
        paddingTop: "5%"
    },
    Button: {
        position: "relative",
        border: 0,
        background: "transparent",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        marginTop: 5,
        color: "#797171",
        '&:hover': {
            outline: "none",
            color: "black"
        },
        '&:focus': {
            outline: "none",
            color: "black"
        },
    },
    selectCountry: {
        width: "100%",
    },
    header: {
        zIndex: 0
    },
    signInButDiv: {
        textAlign: "right",
        paddingTop: "13px"
    },
    signInBut: {
        border: "1px solid #797171",
        color: "#797171",
        borderRadius: "5px",
        width: "30%",
        height: "28px",
    }
});

class SignInDiloge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            heading: "SignIn",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            signInEmail: "",
            signInPassword: "",
            city: "",
            firstName: "",
            lastName: ""
        }
    }

    gettingValues = (name, ev) => {
        if (name !== "email" && name !== "signInEmail"
            && name !== "password" && name !== "confirmPassword"
            && name !== "signInPassword") {
            ev.target.value = capitalizeFirstLetters(ev.target.value)
        }
        this.setState({
            [name]: ev.target.value
        })
        console.log(ev.target.value)
    }

    toggle = (name) => {
        this.setState({
            heading: name
        })
    }

    gettingCity = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    signUp = () => {
        let obj = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            mobileNo: this.state.phoneNumber,
            city: this.state.city
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                firebase.database().ref("wholeData").child("users").child(res.user.uid).set(obj)
                this.props.handleClose()
                setTimeout(() => {
                    success("Successfully Signed Up")
                }, 1200)
            })
            .catch((err) => {
                error(err.message)
            });
    }

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.signInEmail, this.state.signInPassword)
        .then((res) => {
            this.props.handleClose()
            setTimeout(() => {
                success("Successfully Logged In")
            }, 1200)
        })
        .catch((err) => {
            error(err.message)
        });
    }

    render() {
        const { classes } = this.props
        return (
            <Dialog className={classes.header} aria-labelledby="simple-dialog-title" open={this.props.signInOpen}>
                {this.state.heading === "SignIn" && this.props.signIn ?
                    <div>
                        <DialogTitle id="simple-dialog-title" className="h222">Sign In</DialogTitle>
                        <DialogContent>
                            <div>
                                <Input
                                    onChange={(ev) => this.gettingValues("signInEmail", ev)}
                                    placeholder="Enter your email"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    value={this.state.signInEmail}
                                />

                                <br />
                                <br />
                                <Input.Password
                                    onChange={(ev) => this.gettingValues("signInPassword", ev)}
                                    placeholder="Enter your password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    value={this.state.signInPassword}
                                />
                                <div className={classes.signInButDiv}>
                                    <button onClick={this.signIn} className={classes.signInBut}>
                                        Sign In
                                    </button>
                                </div>
                            </div>
                            <div className={classes.extra}>
                                <button
                                    className={classes.Button}
                                    onClick={() => this.toggle("SignUp")}
                                >
                                    Sign Up
                                </button>
                                <br />
                                <button
                                    style={{ color: "red" }}
                                    className={classes.Button}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </DialogContent>
                    </div>
                    :
                    <div>
                        <DialogTitle id="simple-dialog-title" className="h222">Sign Up</DialogTitle>
                        <DialogContent>
                            <div>
                                <Input
                                    onChange={(ev) => this.gettingValues("firstName", ev)}
                                    placeholder="First Name"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0)' }} />}
                                    value={this.state.firstName}
                                />
                                <br />
                                <br />
                                <Input
                                    onChange={(ev) => this.gettingValues("lastName", ev)}
                                    placeholder="Last Name"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0)' }} />}
                                    value={this.state.lastName}
                                />
                                <br />
                                <br />
                                <Input
                                    onChange={(ev) => this.gettingValues("email", ev)}
                                    placeholder="Email"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    value={this.state.email}
                                />
                                <br />
                                <br />
                                <Input.Password
                                    onChange={(ev) => this.gettingValues("password", ev)}
                                    placeholder="Password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    value={this.state.password}
                                />
                                <br />
                                <br />
                                <Input.Password
                                    onChange={(ev) => this.gettingValues("confirmPassword", ev)}
                                    placeholder="Confirm Password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    value={this.state.confirmPassword}
                                />
                                <br />
                                <br />
                                <Input
                                    onChange={(ev) => this.gettingValues("phoneNumber", ev)}
                                    type="number"
                                    placeholder="Phone Number"
                                    value={this.state.phoneNumber}
                                />
                                <br />
                                <br />
                                <Select
                                    showSearch
                                    className={classes.selectCountry}
                                    placeholder="Select Country"
                                    optionFilterProp="children"
                                    name="city"
                                    value={this.state.city}
                                    onChange={(ev) => this.gettingCity("city", ev)}
                                    // onFocus={onFocus}
                                    // onBlur={onBlur}
                                    // onSearch={onSearch}
                                    dropdownClassName={classes.dropDown}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {["Abtabad", "Bhawalpul", "Cholistan",
                                        "Faisalabad", "Hyderabad", "Islamabad", "Karachi",
                                        "Lahore", "Multan", "Sialkot"].map((city, index) => {
                                            return (
                                                <Option key={index} value={city}>{city}</Option>
                                            )
                                        })}
                                </Select>
                                <div className={classes.signInButDiv}>
                                    <button onClick={this.signUp} className={classes.signInBut}>
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                            <div className={classes.extra}>
                                <button
                                    className={classes.Button}
                                    onClick={() => this.toggle("SignIn")}
                                >
                                    Sign In
                                </button>
                                <br />
                                <button
                                    style={{ color: "red" }}
                                    className={classes.Button}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </DialogContent>
                    </div>
                }

                <DialogActions>
                    <Button onClick={this.props.handleClose} className={classes.butt}>
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(withRouter(SignInDiloge))