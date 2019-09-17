import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../AppBar'

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
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        background: "#8080800f",
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing.unit * 1,
        },
    },
});


class Mobiles extends React.Component {
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
            <div >
                <AppBar />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    Mobiles
                </main>
            </div >
        );
    }
}

export default withStyles(styles)(Mobiles);