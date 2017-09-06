import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Paper, Grid, withStyles } from 'material-ui';
import { convertAuthenState } from 'restful-api-redux';
import LoginComponent from '../components/LoginComponent';
import { loginApi as loginApiAction, signupApi as signupApiAction, profileApi as profileApiAction } from '../actions/user';

class LoginScreen extends Component {

  componentWillMount() {
    this.redirectIfPosible(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== this.props.status) {
      this.redirectIfPosible(nextProps);
    }
  }

  redirectIfPosible = (props) => {
    switch (props.status) {
      case 'UNAUTHENTICATED':
        // Do nothing
        break;
      case 'AUTHENTICATED':
        // TODO Redirect to main page after login
        break;
      case 'LOGGING_IN':
        // TODO Show loading indicator
        break;
      case 'LOGIN_ERR':
        // TODO Show error
        break;
      case 'LOGGED_IN':
      default:
        this.props.profileApi();
        break;
    }
  };

  handleLogin = (email, password, remember) => {
    this.props.loginApi(email, password);
  };

  handleSignup = (username, email, password, name) => {
    this.props.signupApi(username, email, password, name);
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} justify="center" align="center">
        <Grid item>
          <Paper className={classes.paper} elevation={4}>
            <LoginComponent onLogin={this.handleLogin} onSignUp={this.handleSignup} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

LoginScreen.propTypes = {
  classes: PropTypes.object,
  status: PropTypes.string,
  profileApi: PropTypes.func,
  loginApi: PropTypes.func,
  signupApi: PropTypes.func,
};

LoginScreen.defaultProps = {};

const styles = theme => ({
  root: {
    height: 'inherit',
  },
  paper: {
    width: '320px',
  },
});

function mapStateToProps(state, props) {
  const authen = convertAuthenState(state);
  return {
    status: authen.status,
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    {
      loginApi: loginApiAction,
      signupApi: signupApiAction,
      profileApi: profileApiAction,
    },
  ),
  withStyles(styles)
);

export default enhance(LoginScreen);
