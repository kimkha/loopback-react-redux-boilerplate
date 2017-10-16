import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Container, Col, Card, CardImg, CardText, CardHeader, CardBody,
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

  render() {
    const { loginErr, signupErr } = this.props;

    return (
      <Card>
        <CardHeader>
          <h3>Login</h3>
        </CardHeader>

        <Container>
          {this.state.tab === 0 && <Form onSubmit={this.handleLogin}>
            {loginErr && <Alert color='danger'>
              Wrong username or password
            </Alert>}
            <FormGroup row>
              <Label for='username' sm={2}>Username</Label>
              <Input id='username'
                     name='username'
                     autoComplete="username"
                     sm={10}
                     onChange={event => this.setState({ username: event.target.value })} />
            </FormGroup>
            <FormGroup row>
              <Label for='password' sm={2}>Password</Label>
              <Input id='password'
                     type='password'
                     name='password'
                     autoComplete="password"
                     sm={10}
                     onChange={event => this.setState({ password: event.target.value })} />
            </FormGroup>
            <FormGroup row>
              <Col sm={12} md={{ size: 10, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input id='remember'
                           type='checkbox'
                           name='remember'
                           checked={this.state.remember}
                           onChange={(event, checked) => this.setState({ remember: checked })} />
                    Remember me
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary">Login</Button>
              </Col>
            </FormGroup>
          </Form>}

          {this.state.tab === 1 && <Form noValidate onSubmit={this.handleSignUp}>
            {signupErr && <Alert color='danger'>
              Something wrong when signing up, please try again
            </Alert>}
            <FormGroup row>
              <Label for='username' sm={2}>Username</Label>
              <Input id='username'
                     name='username'
                     autoComplete="username"
                     sm={10}
                     onChange={event => this.setState({ username: event.target.value })} />
            </FormGroup>
            <TextField id="name"
                       label="Name"
                       className={classes.textField}
                       fullWidth
                       required
                       autoComplete="fname"
                       margin="normal"
                       onChange={event => this.setState({ name: event.target.value })}
            />
            <FormGroup row>
              <Label for='username' sm={2}>Username</Label>
              <Input id='username'
                     name='username'
                     autoComplete="username"
                     sm={10}
                     onChange={event => this.setState({ username: event.target.value })} />
            </FormGroup>
            <TextField id="username"
                       label="Username"
                       className={classes.textField}
                       fullWidth
                       required
                       autoComplete="username"
                       margin="normal"
                       onChange={event => this.setState({ username: event.target.value })}
            />
            <FormGroup row>
              <Label for='username' sm={2}>Username</Label>
              <Input id='username'
                     name='username'
                     autoComplete="username"
                     sm={10}
                     onChange={event => this.setState({ username: event.target.value })} />
            </FormGroup>
            <TextField id="email"
                       label="Email"
                       className={classes.textField}
                       fullWidth
                       required
                       autoComplete="email"
                       margin="normal"
                       onChange={event => this.setState({ email: event.target.value })}
            />
            <FormGroup row>
              <Label for='password' sm={2}>Password</Label>
              <Input id='password'
                     type='password'
                     name='password'
                     autoComplete="password"
                     sm={10}
                     onChange={event => this.setState({ password: event.target.value })} />
            </FormGroup>
            <TextField id="password"
                       label="Password"
                       className={classes.textField}
                       fullWidth
                       required
                       type="password"
                       autoComplete="password"
                       margin="normal"
                       onChange={event => this.setState({ password: event.target.value })}
            />
            <FormGroup row>
              <Label for='password' sm={2}>Password</Label>
              <Input id='password'
                     type='password'
                     name='password'
                     autoComplete="password"
                     sm={10}
                     onChange={event => this.setState({ password: event.target.value })} />
            </FormGroup>
            <TextField id="confirm-password"
                       label="Confirm password"
                       className={classes.textField}
                       fullWidth
                       required
                       type="password"
                       autoComplete="off"
                       margin="normal"
                       onChange={event => this.setState({ confirmPassword: event.target.value })}
            />
            <FormGroup row>
              <Col sm={12} md={{ size: 10, offset: 2 }}>
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
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary">Sign Up</Button>
              </Col>
            </FormGroup>
          </Form>}
        </Container>
      </Card>
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
