import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { compose } from 'recompose';
import { Button } from 'material-ui';
import { convertAuthenState } from 'restful-api-redux';
import { profileApi as profileApiAction } from '../actions/user';
import { listenTicker, stopTicker } from '../actions/ticker';

class HomeScreen extends Component {

  componentWillMount() {
    this.props.profileApi();
    this.props.listenTicker();
  }

  componentWillUnmount() {
    stopTicker();
  }

  handleLogin = () => {
    this.props.push('/login');
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        Hello <br/>
        <Button raised color="primary" onClick={this.handleLogin}>
          Login
        </Button>
        <Button raised color="accent" onClick={() => this.props.push('/test')}>
          Detail
        </Button>
      </div>
    );
  }
}

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

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
      profileApi: profileApiAction,
      push,
      listenTicker,
    },
  )
);

export default enhance(HomeScreen);
