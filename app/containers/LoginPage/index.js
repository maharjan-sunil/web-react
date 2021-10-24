/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, Label, Button, Img, Alert } from '@bootstrap-styled/v4';
import auth from 'helpers/auth';
import LinkButton from 'components/LinkButton';
import { LoginLoader } from 'components/Loader';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectResponse } from './selectors';
import {
  LoginBody,
  LoginBox,
  LoginWrap,
  Logo,
  SubApp,
  StyledFormGroup,
  StyledInput,
} from './styles';
import WallbeeLogo from './WallbeeLogo.png';
import { login } from './actions';

export function LoginPage({ location, onSubmitForm, state }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const { register, handleSubmit, errors, setValue } = useForm();

  React.useEffect(() => {
    register({ name: 'email' }, { required: true });
    register({ name: 'password' }, { required: true });
    localStorage.removeItem('activateEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  }, []);

  let action;
  if (!state.loginSuccess && state.statusCode === 403) {
    action = <Redirect to="/activate" />;
  } else if (
    state.response.error &&
    !state.loginSuccess &&
    !state.activationUser
  ) {
    action = (
      <Alert color="danger">{messages.invalidLogin.defaultMessage}</Alert>
    );
  } else if (state.loginSuccess && auth.isAuthenticated()) {
    const redirectTo = location.state !== undefined ? location.state.from : '/';
    action = <Redirect to={redirectTo} />;
  }

  return (
    <React.Fragment>
      <LoginBody />
      <LoginBox>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <LoginWrap>
            <Logo>
              <Img alt="wallbee-logo" src={WallbeeLogo} />
            </Logo>
            <SubApp>Control System</SubApp>
          </LoginWrap>
          {action}
          <StyledFormGroup>
            <StyledInput
              placeholder="Email"
              name="email"
              autoFocus
              onChange={e => {
                setValue('email', e.currentTarget.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <Label htmlFor="email">Email</Label>
          </StyledFormGroup>
          {errors.email && <p className="text-danger">Email is required</p>}
          <StyledFormGroup>
            <StyledInput
              type="password"
              placeholder="Password"
              name="password"
              onChange={e => {
                setValue('password', e.currentTarget.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <Label htmlFor="password">Password</Label>
          </StyledFormGroup>
          {errors.password && (
            <p className="text-danger">Password is required</p>
          )}
          <Button
            color="primary"
            size="md"
            type="submit"
            className="mr-1"
            disabled={state.loginLoader}
          >
            Log In
          </Button>
          <LinkButton color="link" size="md" tag={Link} to="/forgot-password">
            Forgot Password ?
          </LinkButton>
          {state.loginLoader && <LoginLoader message="Authenticating User" />}
          <p className="mt-5 mb-3 text-muted text-center">
            &copy; WallBee 2020
          </p>
        </Form>
      </LoginBox>
    </React.Fragment>
  );
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func,
  state: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectResponse(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: data => dispatch(login(data.email, data.password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
