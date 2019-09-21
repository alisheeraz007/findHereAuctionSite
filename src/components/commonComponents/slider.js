import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import slider1 from '../../Images/sliderImage1.jpg'
import slider2 from '../../Images/slider4.webp'
import slider3 from '../../Images/sliderImage3.jpg'
import { withStyles } from '@material-ui/core/styles';
import { style } from '@material-ui/system';

const styles = theme => ({
    carousel: {
        [theme.breakpoints.down('lg')]: {
            height: "55vh",
        },
        [theme.breakpoints.down('md')]: {
            height: "55vh",
        },
        [theme.breakpoints.down('sm')]: {
            height: "25vh",
        },
    },
    img: {
        [theme.breakpoints.down('lg')]: {
            width: "100%",
            height: "55vh",
        },
        [theme.breakpoints.down('md')]: {
            width: "100%",
            height: "55vh",
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            height: "25vh",
        },
    }
});


class ControlledCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            setIndex: 0,
            direction: null,
            setDirection: null
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
    render() {
        const { classes } = this.props;
        return (
            <Carousel className={classes.carousel}>
                <Carousel.Item>
                    <img
                        className={classes.img}
                        src={slider1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className={classes.img}
                        src={slider2}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className={classes.img}
                        src={slider3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default withStyles(styles)(ControlledCarousel);