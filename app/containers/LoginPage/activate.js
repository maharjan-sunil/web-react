/* eslint-disable indent */
import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Key } from '@styled-icons/fa-solid/Key';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, Label, Button, Img, Alert } from '@bootstrap-styled/v4';
import LinkButton from 'components/LinkButton';
import auth from 'helpers/auth';
import { LoginLoader, ButtonLoader } from 'components/Loader';
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
  StyledInputGroupWrap,
} from './styles';

import WallbeeLogo from './WallbeeLogo.png';
import {
  activateUserAction,
  resendActivationCodeAction,
  resetStatusCodeAction,
} from './actions';

export function Activate({
  location,
  onSubmitForm,
  state,
  onResendActivation,
  on403,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const { register, handleSubmit, errors, setValue, watch } = useForm();
  const [{ email }, setDefaultValue] = useState({
    email: '',
  });
  React.useEffect(() => {
    register({ name: 'email' }, { required: true });
    register({ name: 'newPassword' }, { required: true });
    register(
      { name: 'confirmPassword' },
      { required: true, validate: value => value === watch('newPassword') },
    );
    register({ name: 'activationCode' }, { required: true });
    if (localStorage.getItem('activateEmail') !== '') {
      setDefaultValue({
        email: localStorage.getItem('activateEmail'),
      });
      setValue('email', localStorage.getItem('activateEmail'));
    }
    on403();
  }, []);

  let action;
  if (state.response.error && !state.loginSuccess) {
    action = (
      <Alert color="danger">{messages.activationFailed.defaultMessage}</Alert>
    );
  } else if (state.response === true) {
    action = (
      <Alert color="success">{messages.activationSuccess.defaultMessage}</Alert>
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
              readOnly="readOnly"
              autoFocus
              defaultValue={email}
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
              placeholder="New Password"
              name="newPassword"
              onChange={e => {
                setValue('newPassword', e.currentTarget.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <Label htmlFor="newPassword">New Password</Label>
          </StyledFormGroup>
          {errors.newPassword && errors.newPassword.type === 'required' && (
            <p className="text-danger">New Password is required</p>
          )}
          <StyledFormGroup>
            <StyledInput
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={e => {
                setValue('confirmPassword', e.currentTarget.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </StyledFormGroup>
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'required' && (
              <p className="text-danger">Confirm Password is required</p>
            )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <p className="text-danger">Confirm Password not match</p>
            )}
          <StyledInputGroupWrap>
            <div>
              <StyledFormGroup>
                <StyledInput
                  type="text"
                  placeholder="Activation Code"
                  name="activationCode"
                  onChange={e => {
                    setValue('activationCode', e.currentTarget.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
                <Label htmlFor="activationCode">Activation Code</Label>
              </StyledFormGroup>
              {errors.activationCode && (
                <p className="text-danger">Activation Code is required</p>
              )}
            </div>
            <div>
              <Button
                data-toggle="tooltip"
                data-placement="top"
                title="Resend activation code"
                className="btn"
                disabled={state.buttonLoader}
                onClick={() => {
                  onResendActivation(email);
                }}
              >
                {state.buttonLoader ? <ButtonLoader /> : <Key size="12" />}
              </Button>
            </div>
          </StyledInputGroupWrap>
          <Button
            color="primary"
            size="md"
            type="submit"
            className="mr-1"
            disabled={state.loginLoader}
          >
            Activate
          </Button>
          <LinkButton color="link" size="md" tag={Link} to="/login">
            Sign in with another user
          </LinkButton>
          {state.loginLoader && <LoginLoader message="Activating User" />}
          <p className="mt-5 mb-3 text-muted text-center">
            &copy; WallBee 2020
          </p>
        </Form>
      </LoginBox>
    </React.Fragment>
  );
}

Activate.propTypes = {
  onSubmitForm: PropTypes.func,
  onResendActivation: PropTypes.func,
  state: PropTypes.object,
  location: PropTypes.object,
  on403: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectResponse(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: data => {
      dispatch(
        activateUserAction(
          data.email,
          data.newPassword,
          data.confirmPassword,
          data.activationCode,
        ),
      );
    },
    onResendActivation: email => {
      dispatch(resendActivationCodeAction(email));
    },
    on403: () => {
      dispatch(resetStatusCodeAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Activate);
