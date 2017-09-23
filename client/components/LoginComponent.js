import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, TextField, Typography, Button, FormControlLabel, Checkbox, withStyles } from 'material-ui';

class LoginComponent extends Component {
  state = {
    tab: 0,
    username: null,
    email: null,
    password: null,
    remember: false,
    confirmPassword: null,
    name: null,
    tos: false,
  };

  handleSignUp = (event) => {
    const { name, username, email, password, confirmPassword, tos } = this.state;

    console.log('Signup');

    if (name && username && email && password && confirmPassword === password && tos) {
      const { onSignUp } = this.props;
      onSignUp && onSignUp(username, email, password, name);
    }

    event.preventDefault();
  };

  handleLogin = (event) => {
    // TODO Validate
    const { username, password, remember } = this.state;

    if (username && password) {
      this.props.onLogin(username, password, remember);
    }

    event.preventDefault();
  };

  render() {
    const { classes, loginErr, signupErr } = this.props;

    return (
      <div className={classes.container}>
        <Tabs fullWidth
              value={this.state.tab}
              onChange={(event, tab) => this.setState({ tab })}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {this.state.tab === 0 && <form className={classes.content} onSubmit={this.handleLogin}>
          <Typography type="headline" component="h2">
            Welcome back
          </Typography>
          {loginErr && <Typography type="body1" color='accent'>
            Wrong username or password
          </Typography>}
          <TextField id="username"
                     label="Username"
                     className={classes.textField}
                     fullWidth
                     autoComplete="username"
                     margin="normal"
                     onChange={event => this.setState({ username: event.target.value })}
          />
          <TextField id="password"
                     label="Password"
                     className={classes.textField}
                     fullWidth
                     type="password"
                     autoComplete="password"
                     margin="normal"
                     onChange={event => this.setState({ password: event.target.value })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.remember}
                onChange={(event, checked) => this.setState({ remember: checked })}
              />
            }
            label="Remember me"
          />
          <Button type="submit" raised color="primary">
            Login
          </Button>
        </form>}

        {this.state.tab === 1 && <form className={classes.content} noValidate onSubmit={this.handleSignUp}>
          <Typography type="headline" component="h2">
            Signup
          </Typography>
          {signupErr && <Typography type="body1" color='accent'>
            Something wrong when signing up, please try again
          </Typography>}
          <TextField id="name"
                     label="Name"
                     className={classes.textField}
                     fullWidth
                     required
                     autoComplete="fname"
                     margin="normal"
                     onChange={event => this.setState({ name: event.target.value })}
          />
          <TextField id="username"
                     label="Username"
                     className={classes.textField}
                     fullWidth
                     required
                     autoComplete="username"
                     margin="normal"
                     onChange={event => this.setState({ username: event.target.value })}
          />
          <TextField id="email"
                     label="Email"
                     className={classes.textField}
                     fullWidth
                     required
                     autoComplete="email"
                     margin="normal"
                     onChange={event => this.setState({ email: event.target.value })}
          />
          <TextField id="password"
                     label="Password"
                     className={classes.textField}
                     fullWidth
                     required
                     type="password"
                     autoComplete="password"
                     margin="normal"
                     onChange={event => this.setState({ password: event.target.value })}
          />
          <TextField id="confirm-password"
                     label="Confirm password"
                     className={classes.textField}
                     fullWidth
                     required
                     type="password"
                     autoComplete="off"
                     margin="normal"
                     onChange={event => this.setState({ confirmPassword: event.target.value })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.tos}
                onChange={(event, checked) => this.setState({ tos: checked })}
              />
            }
            label="I accept the Term of Services"
          />
          <Button type="submit" raised color="primary">
            Sign Up
          </Button>
        </form>}
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
  },
});

LoginComponent.propTypes = {
  classes: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onSignUp: PropTypes.func,
  loginErr: PropTypes.bool,
  signupErr: PropTypes.bool,
};

LoginComponent.defaultProps = {};

export default withStyles(styles)(LoginComponent);
