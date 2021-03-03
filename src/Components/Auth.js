import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
        name: 'firstName',
        label: 'First Name',
        autoFocus: true,
        layout: layouts.half
    },
    {
        name: 'lastName',
        label: 'Last Name',
        layout: layouts.half
    },
    {
        name: 'email',
        label: 'Email Address',
        layout: layouts.full,
        fullWidth: true
    },
    {
        name: 'password',
        label: 'Password',
        layout: layouts.full,
        fullWidth: true
    }],
    signIn: [{
        name: 'email',
        label: 'Email Address',
        layout: layouts.full,
        autoFocus: true,
        fullWidth: true
    },
    {
        name: 'password',
        label: 'Password',
        layout: layouts.full,
        fullWidth: true
    }]
}

export default function Auth() {
    const classes = useStyles();
    const auth = ['signUp', 'signIn']
    const authNiceNames = ['Sign up', 'Sign in']
    const [authType, setAuthType] = useState(0)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {authNiceNames[authType]}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        {
                            fields[auth[authType]].map(({layout, ...field}) => (
                                <Grid item {...layout}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        {...field}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {authNiceNames[authType]}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {/*
                                +!authType === switch to different authType
                            */}
                            <Link href="#" variant="body2" onClick={() => setAuthType(+!authType)}>
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