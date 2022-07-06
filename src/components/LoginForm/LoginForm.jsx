import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../styles/styles.jsx";

//for password visibility:
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { IconButton, InputAdornment, Button, TextField, Grid, Typography } from "@material-ui/core";

function LoginForm() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  // for showing password on icon click
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Grid container className={classes.loginForm} spacing={1}>
      <form className="formPanel" onSubmit={login}>
        <img className={classes.logo} src="/images/magic-beans-logo.png" />

        <h2 className="loginText" style={{ color: "#216091" }}>
          Login
        </h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            <TextField
              className={classes.loginTextField}
              variant="outlined"
              label="username"
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <TextField
              className={classes.loginTextField}
              variant="outlined"
              label="password"
              name="password"
              required
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                // This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </label>
        </div>
        <div>
          <Button className={classes.loginButton} size="large" variant="contained" type="submit" name="submit">
            Go!
          </Button>
        </div>
      </form>
    </Grid>
  );
}

export default LoginForm;
