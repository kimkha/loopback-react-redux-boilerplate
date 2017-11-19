import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, Drawer, Toolbar, List, ListItem, ListItemText, Typography, Hidden, Divider } from 'material-ui';

const styles = theme => ({
  paper: {
    width: 240,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary[500],
      textDecoration: 'underline',
    },
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
});

class AppDrawer extends PureComponent {
  renderNavItems() {
    return (
      <List>
        <ListItem button
                  component={Link}
                  to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button
                  component={Link}
                  to="/test">
          <ListItemText primary="Detail" />
        </ListItem>
      </List>
    )
  }

  render() {
    const { classes, className, disablePermanent, mobileOpen, onRequestClose } = this.props;

    const drawer = (
      <div className={classes.nav}>
        <div className={classes.toolbarIe11}>
          <Toolbar className={classes.toolbar}>
            <Link className={classes.title} to="/" onClick={onRequestClose}>
              <Typography type="title" gutterBottom color="inherit">
                Site name
              </Typography>
            </Link>
            {/*{process.env.MATERIAL_UI_VERSION ? (*/}
            {/*<Link*/}
            {/*className={classes.anchor}*/}
            {/*href={`${GITHUB_RELEASE_BASE_URL}v${process.env.MATERIAL_UI_VERSION}`}*/}
            {/*>*/}
            {/*<Typography type="caption">{`v${process.env.MATERIAL_UI_VERSION}`}</Typography>*/}
            {/*</Link>*/}
            {/*) : null}*/}
            <Divider absolute />
          </Toolbar>
        </div>
        {this.renderNavItems()}
      </div>
    );

    return (
      <div className={className}>
        <Hidden mdUp={!disablePermanent}>
          <Drawer
            classes={{
              paper: classes.paper,
            }}
            type="temporary"
            open={mobileOpen}
            onRequestClose={onRequestClose}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {disablePermanent ? null : (
          <Hidden mdDown implementation="css">
            <Drawer
              classes={{
                paper: classes.paper,
              }}
              type="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        )}
      </div>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

AppDrawer.defaultProps = {};

export default withStyles(styles)(AppDrawer);
