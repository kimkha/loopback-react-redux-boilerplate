import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { push } from 'react-router-redux';
import { convertAuthenState } from 'restful-api-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { logoutApi } from './actions/user';

class Layout extends Component {
  state = {
    isOpen: true,
  };

  handleToggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleLogin = () => {
    this.props.push('/login');
  };

  handleLogout = () => {
    this.props.logoutApi();
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Title</NavbarBrand>
          <NavbarToggler onClick={this.handleToggleNav} />
          <Collapse isOpen={this.state.isOpen}>
            {status === 'AUTHENTICATED' ? this.renderUserTopBox() : this.renderLogin()}
          </Collapse>
        </Navbar>
        <div style={{ padding: 20 }}>
          {children}
        </div>
      </div>
    );
  }

  renderUserTopBox() {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink onClick={this.handleLogout}>Logout</NavLink>
        </NavItem>
      </Nav>
    )
  }

  renderLogin() {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink onClick={this.handleLogin}>Login</NavLink>
        </NavItem>
      </Nav>
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
);

export default enhance(Layout);
