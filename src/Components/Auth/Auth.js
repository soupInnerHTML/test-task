import { Snackbar } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import fauth from '../../store/Auth'
import AuthInput from './AuthInput'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const layouts = {
    half: {
        xs: 12,
        sm: 6
    },
    full: {
        xs: 12
    }
}

const fields = {
    signUp: [{
        id: "1",
        name: 'firstName',
        label: 'First Name',
        autoFocus: true,
        layout: layouts.half
    },
    {
        id: "2",
        name: 'lastName',
        label: 'Last Name',
        layout: layouts.half
    },
    {
        id: "3",
        name: 'email',
        label: 'Email Address',
        layout: layouts.full,
        fullWidth: true
    },
    {
        id: "4",
        name: 'password',
        label: 'Password',
        layout: layouts.full,
        fullWidth: true,
        type: 'password'
    }],
    signIn: [{
        id: "5",
        name: 'email',
        label: 'Email Address',
        layout: layouts.full,
        autoFocus: true,
        fullWidth: true
    },
    {
        id: "6",
        name: 'password',
        label: 'Password',
        type: 'password',
        layout: layouts.full,
        fullWidth: true
    }]
}

const Auth = () => {
    const classes = useStyles()
    const auth = ['signUp', 'signIn']
    const authNiceNames = ['Sign up', 'Sign in']
    const [authType, setAuthType] = useState(0)

    const authUser = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries())

        fauth[auth[authType]](formData) //auth.signIn() or auth.signUp()
    }

    const switchAuthType = () => {
        {/*
            +!authType === switch to different authType
        */}
        setAuthType(+!authType)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Snackbar open={!!fauth.error}>
                <Alert severity="error">{fauth.error}</Alert>
            </Snackbar>

            <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    {authNiceNames[authType]}
                </Typography>

                <form className={classes.form} onSubmit={authUser}>
                    <Grid container spacing={2}>
                        {
                            fields[auth[authType]].map(({ layout, ...field }) => (
                                <AuthInput {...{ field, layout }} key={field.id} />
                            ))
                        }
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={fauth.isFetching}
                    >
                        {authNiceNames[authType]}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={switchAuthType}>
                                {/*
                                    Already have an account? Sign in
                                    or
                                    Don't have an account? Sign Up
                                */}
                                {authType ? 'Don\'t' : 'Already'}
                                &nbsp;have an account?&nbsp;
                                {authNiceNames[+!authType]}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default observer(Auth)