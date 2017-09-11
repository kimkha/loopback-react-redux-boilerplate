import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { AppBar, Toolbar, Typography } from 'material-ui';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="title" color="inherit">
              Title
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 20 }}>
          {children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {};

Layout.defaultProps = {};

function mapStateToProps(state, props) {
  return {};
}

const enhance = compose(
  connect(
    mapStateToProps,
    {},
  )
);

export default enhance(Layout);
