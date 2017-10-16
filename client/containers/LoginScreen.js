import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import { compose } from 'recompose';
import { Container, Row, Col } from 'reactstrap';
import { convertAuthenState } from 'restful-api-redux';
import LoginComponent from '../components/LoginComponent';
import { loginApi as loginApiAction, signupApi as signupApiAction, profileApi as profileApiAction } from '../actions/user';

class LoginScreen extends Component {
  state = {
    loginErr: false,
  };

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
        // Redirect to main page after login
        this.props.replace('/');
        break;
      case 'LOGGING_IN':
        // TODO Show loading indicator
        this.setState({
          loginErr: false,
        });
        break;
      case 'LOGIN_ERR':
        // Show error
        this.setState({
          loginErr: true,
        });
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
      <Container>
        <Row>
          <Col>
            <LoginComponent onLogin={this.handleLogin} onSignUp={this.handleSignup} loginErr={this.state.loginErr} />
          </Col>
        </Row>
      </Container>
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
      push,
      replace,
    },
  ),
);

export default enhance(LoginScreen);
