import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, TextField, Typography, Button, FormControlLabel, Checkbox, withStyles } from 'material-ui';

class LoginComponent extends Component {
  state = {
    tab: 0,
    email: null,
    password: null,
    remember: false,
    confirmPassword: null,
    name: null,
    tos: false,
  };

  handleSignUp = (event) => {
    const { onSignUp } = this.props;
    onSignUp && onSignUp();

    event.preventDefault();
  };

  handleLogin = (event) => {
    // TODO Validate
    const { email, password } = this.state;

    if (email && password) {
      this.props.onLogin(email, password);
    }

    event.preventDefault();
  };

  render() {
    const { classes, onSignUp } = this.props;

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
          <TextField id="email"
                     label="Email"
                     className={classes.textField}
                     fullWidth
                     autoComplete="email"
                     margin="normal"
                     onChange={event => this.setState({ email: event.target.value })}
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
          <TextField id="name"
                     label="Name"
                     className={classes.textField}
                     fullWidth
                     required
                     autoComplete="fname"
                     margin="normal"
                     onChange={event => this.setState({ name: event.target.value })}
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
          <Button raised color="primary">
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
};

LoginComponent.defaultProps = {};

export default withStyles(styles)(LoginComponent);
