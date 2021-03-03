import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {observer} from "mobx-react-lite";
import React from 'react'
import {Link} from "react-router-dom";
import contacts from "../../store/Contacts";
import Contact from "./Contact";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import HomeIcon from '@material-ui/icons/Home';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import Zoom from '@material-ui/core/Zoom';

const Contacts = ({source, label, link}) => {
    const linkIcons = {
        '/contacts' : <BookmarkIcon/>,
        '/' : <HomeIcon/>
    }

    return (
        <>
            <Tooltip title={link.label} arrow TransitionComponent={Zoom}>
                <Link to={link.to}>
                    <Fab color={link.theme} aria-label="add">
                        {linkIcons[link.to]}
                    </Fab>
                </Link>
            </Tooltip>

            <Typography gutterBottom style={{textAlign: 'center'}} variant="h4">
                {label}

            </Typography>

            <Grid
                container
                justify="center"
                alignItems="center"
            >
                {
                    contacts[source].length ? contacts[source].map(user => (
                       <Contact {...{user}} key={user.id}/>
                    )) : <>
                        <ErrorIcon style={{marginRight: 10}}/>
                        <p>The list is empty</p>
                    </>
                }
            </Grid>
        </>
    )
}

export default observer(Contacts)