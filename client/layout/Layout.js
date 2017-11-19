import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { push } from 'react-router-redux';
import { convertAuthenState } from 'restful-api-redux';
import { withStyles, AppBar, Toolbar, IconButton, Typography, Button, Hidden, Drawer, Divider, List, ListItem, ListItemText } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import { logoutApi } from '../actions/user';
import Menu from './Menu';

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

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
        <AppBar color="primary" className={classes.appBar}>
          {this.renderToolBar()}
        </AppBar>
        <Hidden mdUp>
          <Drawer
            type="temporary"
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onRequestClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Menu headerClass={classes.drawerHeader}/>
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            type="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Menu headerClass={classes.drawerHeader}/>
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {children}
        </main>
        </div>
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

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
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
      logoutApi
    },
  ),
  withStyles(styles, { withTheme: true }),
);

export default enhance(Layout);
