import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { convertAuthenState } from 'restful-api-redux';
import { AppBar, Toolbar, Typography, Button } from 'material-ui';

class Layout extends Component {

  handleLogin = () => {
    console.log('dddd');
    this.props.push('/login');
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <AppBar position="static" color="primary">
          {this.renderToolBar()}
        </AppBar>
        <div style={{ padding: 20 }}>
          {children}
        </div>
      </div>
    );
  }

  renderToolBar() {
    const { status } = this.props;
    return (
      <Toolbar>
        <Typography type="title" color="inherit">
          Title
        </Typography>
        {status === 'AUTHENTICATED' ? this.renderUserTopBox() : this.renderLogin()}
      </Toolbar>
    );
  }

  renderUserTopBox() {
    return (
      <Button color="contrast" onClick={this.handleLogin}>User</Button>
    )
  }

  renderLogin() {
    return (
      <Button color="contrast" onClick={this.handleLogin}>Login</Button>
    );
  }
}

Layout.propTypes = {};

Layout.defaultProps = {};

function mapStateToProps(state, props) {
  const authen = convertAuthenState(state);
  return {
    status: authen.status,
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    {},
  )
);

export default enhance(Layout);
