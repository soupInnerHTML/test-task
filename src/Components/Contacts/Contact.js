import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from '@material-ui/icons/Star';
import contacts from "../../store/Contacts";
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    user: {
        margin: 20,
        position: 'relative'
    },
    star: {
        position: 'absolute',
        top: -5,
        right: -10,
        cursor: 'pointer'
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: 'auto',
        backgroundColor: deepPurple[300],
    },
    userName: {
        lineBreak: 'anywhere',
        maxWidth: theme.spacing(10),
        textAlign: "center"
    }
}));

const Contact = ({ user }) => {
    const classes = useStyles()
    const [isHover, setHover] = useState(false)

    return (
        <div className={classes.user} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Avatar alt="" className={classes.avatar} />
            <p className={classes.userName}>{`${user.firstName} ${user.lastName}`}</p>

            { (isHover || user.isElected) && <div className={classes.star} onClick={() => contacts.elect(user)}>
                {user.isElected ? <StarIcon color={'secondary'} /> : <StarBorderOutlinedIcon />}
            </div>}
        </div>
    )
}

export default observer(Contact)