import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Paper, Grid, withStyles } from 'material-ui';
import LoginComponent from '../components/LoginComponent';

class LoginScreen extends Component {
  handleLogin = (email, password) => {
    console.log(email, password);
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} justify="center" align="center">
        <Grid item>
          <Paper className={classes.paper} elevation={4}>
            <LoginComponent onLogin={this.handleLogin} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

LoginScreen.propTypes = {
  classes: PropTypes.object,
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
  return {};
}

const enhance = compose(
  connect(
    mapStateToProps,
    {},
  ),
  withStyles(styles)
);

export default enhance(LoginScreen);
