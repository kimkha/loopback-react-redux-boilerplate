import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { push } from 'react-router-redux';
import { convertAuthenState } from 'restful-api-redux';
import { withStyles, AppBar, Toolbar, Typography, Button } from 'material-ui';

class Layout extends Component {

  handleLogin = () => {
    console.log('dddd');
    this.props.push('/login');
  };

  render() {
    const { children, classes } = this.props;

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
    const { status, classes } = this.props;
    return (
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
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

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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
      push,
    },
  ),
  withStyles(styles),
);

export default enhance(Layout);
