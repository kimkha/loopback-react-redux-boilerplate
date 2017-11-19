import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { push } from 'react-router-redux';
import { convertAuthenState } from 'restful-api-redux';
import { withStyles, AppBar, Toolbar, IconButton, Typography, Button, Hidden } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import { logoutApi } from '../actions/user';
import AppDrawer from './AppDrawer';

const drawerWidth = 240;

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
      '@media print': {
        background: theme.palette.common.white,
      },
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
    },
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        position: 'fixed',
        background:
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        borderRadius: 1,
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
      },
      '& dd, & dt': {
        position: 'absolute',
        top: 0,
        height: 2,
        boxShadow: `${
          theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
          } 1px 0 6px 1px`,
        borderRadius: '100%',
        animation: 'nprogress-pulse 2s ease-out 0s infinite',
      },
      '& dd': {
        opacity: 0.6,
        width: 20,
        right: 0,
        clip: 'rect(-6px,22px,14px,10px)',
      },
      '& dt': {
        opacity: 0.6,
        width: 180,
        right: -80,
        clip: 'rect(-6px,90px,14px,-6px)',
      },
    },
    '@keyframes nprogress-pulse': {
      '30%': {
        opacity: 0.6,
      },
      '60%': {
        opacity: 0,
      },
      to: {
        opacity: 0.6,
      },
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
});

class Layout extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleLogin = () => {
    this.props.push('/login');
  };

  handleLogout = () => {
    this.props.logoutApi();
  };

  render() {
    const { children, classes } = this.props;
    const disablePermanent = false; // true for no drawer pages

    return (
      <div className={classes.root}>
        <AppBar color="primary" className={classes.appBar}>
          {this.renderToolBar()}
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          disablePermanent={disablePermanent}
          onRequestClose={this.handleDrawerToggle}
          mobileOpen={this.state.mobileOpen}
        />
        <main className={classes.content}>
          {children}
        </main>
      </div>
    );
  }

  renderToolBar() {
    const { status, classes } = this.props;
    return (
      <Toolbar>
        <IconButton
          color="contrast"
          aria-label="open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={classes.flex}>
          Title
        </Typography>
        <div className={classes.grow} />
        {status === 'AUTHENTICATED' ? this.renderUserTopBox() : this.renderLogin()}
      </Toolbar>
    );
  }

  renderUserTopBox() {
    return (
      <Button color="contrast" onClick={this.handleLogout}>User</Button>
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
    {
      push,
      logoutApi
    },
  ),
  withStyles(styles, { withTheme: true }),
);

export default enhance(Layout);
