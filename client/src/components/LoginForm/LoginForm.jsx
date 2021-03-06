/* eslint-disable */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SimpleAlerts from '../SimpleAlerts/SimpleAlerts';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправил', login, password);
    // axios.post('http://localhost:8080/login', { login: 'admin', password: 'admin' }).then((res) => { console.log(res); });
    axios.post('http://localhost:8080/login', { login: 'admin', password: 'admin' }, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
      },
      // }).then((response) => console.log(response));
    }).then((response) => response.status === 200 ? setSuccess(true) : setSuccess(false));
  };

  const handleLoginInput = (e) => {
    setLogin(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  // useEffect(() => {
  //   if (success) {
  //     setSuccess(true)
  //   } else {
  //     setSuccess(true)
  //   }
  // }, [success]);

  return (
    <div>
      { success === true ? <Redirect to="/" /> : (
        <Container component="main" maxWidth="xs">
          {/* <SimpleAlerts /> */}
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
      </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={login}
                onChange={(e) => handleLoginInput(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => handlePasswordInput(e)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => handleSubmit(e)}
              >
                Sign In
        </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Forgot password?
            </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    Don t have an account? Sign Up
            </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )};
      <h1>{console.log(success)}</h1>
    </div>
  );
}
