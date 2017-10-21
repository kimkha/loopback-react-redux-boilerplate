import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Container, Row, Col, Card, CardImg, CardText, CardHeader, CardBody,
  CardTitle, CardSubtitle, Button, Label, Input, Form, FormGroup, FormText } from 'reactstrap';

class LoginComponent extends Component {
  state = {
    tab: 0,
    username: null,
    email: null,
    password: null,
    remember: false,
    confirmPassword: null,
    name: null,
    tos: false,
  };

  handleSignUp = (event) => {
    const { name, username, email, password, confirmPassword, tos } = this.state;

    console.log('Signup');

    if (name && username && email && password && confirmPassword === password && tos) {
      const { onSignUp } = this.props;
      onSignUp && onSignUp(username, email, password, name);
    }

    event.preventDefault();
  };

  handleLogin = (event) => {
    // TODO Validate
    const { username, password, remember } = this.state;

    if (username && password) {
      this.props.onLogin(username, password, remember);
    }

    event.preventDefault();
  };

  handleOpenSignup = (event) => {
    event.preventDefault();

    this.setState({ tab: 1 });
  };

  handleOpenLogin = (event) => {
    event.preventDefault();

    this.setState({ tab: 0 });
  };

  render() {
    const { loginErr, signupErr } = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h2 className="text-center mb-4">Site name</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6} className='mx-auto'>
      <Card>
        <CardHeader>
          <h3>Login</h3>
        </CardHeader>

        <Container className='card-body'>
          {this.state.tab === 0 && <Form onSubmit={this.handleLogin}>
            {loginErr && <Alert color='danger'>
              Wrong username or password
            </Alert>}
            <FormGroup row>
              <Label for='username' sm={3}>Username</Label>
              <Col sm={9}>
              <Input id='username'
                     name='username'
                     autoComplete="username"
                     onChange={event => this.setState({ username: event.target.value })} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='password' sm={3}>Password</Label>
              <Col sm={9}>
              <Input id='password'
                     type='password'
                     name='password'
                     autoComplete="password"
                     onChange={event => this.setState({ password: event.target.value })} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12} md={{ size: 9, offset: 3 }}>
                <FormGroup check>
                  <Label check>
                    <Input id='remember'
                           type='checkbox'
                           name='remember'
                           checked={this.state.remember}
                           onChange={(event, checked) => this.setState({ remember: checked })} />
                    &nbsp; Remember me
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col md={{ size: 6, pull: 'right' }}>
                <Button color="success">Login</Button>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 6, pull: 'right' }}>
                <a href='' onClick={this.handleOpenSignup}>Sign up for new account</a>
              </Col>
            </FormGroup>
          </Form>}

          {this.state.tab === 1 && <Form noValidate onSubmit={this.handleSignUp}>
            {signupErr && <Alert color='danger'>
              Something wrong when signing up, please try again
            </Alert>}
            <FormGroup row>
              <Label for='name' sm={3}>Name</Label>
              <Col sm={9}>
              <Input id='name'
                     name='name'
                     autoComplete="fname"
                     onChange={event => this.setState({ name: event.target.value })} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='username' sm={3}>Username</Label>
              <Col sm={9}>
              <Input id='username'
                     name='username'
                     autoComplete="username"
                     onChange={event => this.setState({ username: event.target.value })} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='email' sm={3}>Email</Label>
              <Col sm={9}>
              <Input id='email'
                     name='email'
                     autoComplete="email"
                     onChange={event => this.setState({ email: event.target.value })} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='password' sm={3}>Password</Label>
              <Col sm={9}>
              <Input id='password'
                     type='password'
                     name='password'
                     autoComplete="password"
                     onChange={event => this.setState({ password: event.target.value })} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='confirm-password' sm={3}>Confirm password</Label>
              <Col sm={9}>
              <Input id='password'
                     type='password'
                     name='confirm-password'
                     autoComplete="off"
                     onChange={event => this.setState({ confirmPassword: event.target.value })} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12} md={{ size: 9, offset: 3 }}>
                <FormGroup check>
                  <Label check>
                    <Input id='tos'
                           type='checkbox'
                           name='tos'
                           checked={this.state.tos}
                           onChange={(event, checked) => this.setState({ tos: checked })} />
                    I accept the Term of Services
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col md={{ size: 2, pull: 'right' }}>
                <Button color="primary">Sign Up</Button>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 6, pull: 'right' }}>
                <a href='' onClick={this.handleOpenLogin}>Existing account, sign in</a>
              </Col>
            </FormGroup>
          </Form>}
        </Container>
      </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginComponent.propTypes = {
  classes: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onSignUp: PropTypes.func,
  loginErr: PropTypes.bool,
  signupErr: PropTypes.bool,
};

LoginComponent.defaultProps = {};

export default LoginComponent;
