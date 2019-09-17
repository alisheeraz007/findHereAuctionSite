import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
        background: "#000000",
        fontWeight: "bolder",
        color: "wheat",
        opacity: 0.7,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fixed: {
        [theme.breakpoints.down('lg')]: {
            display: "none"
        },
        [theme.breakpoints.down('md')]: {
            display: "none"
        },
        [theme.breakpoints.down('sm')]: {
            display: "block",
            position: "fixed",
            top: "95%",
            left: "90%",
            transform: "translate(-90%, -95%)"
        },
    }
}));

export default function FloatingActionButtons() {
    const classes = useStyles();

    return (
        <div className={classes.fixed}>
            <Fab size="medium" aria-label="add" className={classes.fab}>
                Sell
            </Fab>
        </div>
    );
}