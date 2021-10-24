/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, Label, Button, Img, Alert } from '@bootstrap-styled/v4';
import LinkButton from 'components/LinkButton';
import { Key } from '@styled-icons/fa-solid/Key';
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
  emailVerifyAction,
  updatePasswordAction,
  resetStateAction,
  resendActivationCodeAction,
} from './actions';

export function ForgotPassword({
  location,
  onSubmitForm,
  state,
  onLoadResetState,
  onEmailVerify,
  onResendActivation,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const { register, handleSubmit, errors, setValue, watch } = useForm();
  const [{ isEmailVerified }, setDefaultValue] = useState({
    isEmailVerified: false,
  });
  const [{ email }, setEmail] = useState({
    email: '',
  });

  if (state.response === true && !isEmailVerified) {
    setDefaultValue({
      isEmailVerified: true,
    });
    register({ name: 'code' }, { required: true });
    register({ name: 'newPassword' }, { required: true });
    register(
      { name: 'confirmPassword' },
      { required: true, validate: value => value === watch('newPassword') },
    );
  }
  React.useEffect(() => {
    register({ name: 'email' }, { required: true });
    onLoadResetState();
  }, []);

  let action;
  if (state.error && !state.isVerifyEmail) {
    action = (
      <Alert color="danger">
        {messages.emailVerifiedFailed.defaultMessage}
      </Alert>
    );
  } else if (state.error && state.isVerifyEmail && !state.isVerifyCode) {
    action = (
      <Alert color="danger">{messages.codeVerifiedFailed.defaultMessage}</Alert>
    );
  } else if (state.response && state.isVerifyEmail && !state.isVerifyCode) {
    action = (
      <Alert color="success">{messages.emailVerified.defaultMessage}</Alert>
    );
  } else if (state.response && state.isVerifyEmail && state.isVerifyCode) {
    const redirectTo = location.state !== undefined ? location.state.from : '/';
    action = <Redirect to={redirectTo} />;
  }

  return (
    <React.Fragment>
      <LoginBody />
      <LoginBox>
        <Form
          onSubmit={handleSubmit(
            !isEmailVerified ? onEmailVerify : onSubmitForm,
          )}
        >
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
              readOnly={!!isEmailVerified}
              autoFocus
              onChange={e => {
                setValue('email', e.currentTarget.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setEmail({
                  email: e.currentTarget.value,
                });
              }}
            />
            <Label htmlFor="email">Email</Label>
          </StyledFormGroup>
          {errors.email && <p className="text-danger">Email is required</p>}
          {isEmailVerified && (
            <StyledInputGroupWrap>
              <div>
                <StyledFormGroup>
                  <StyledInput
                    type="text"
                    placeholder="code"
                    name="code"
                    onChange={e => {
                      setValue('code', e.currentTarget.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                  <Label htmlFor="code">Code</Label>
                </StyledFormGroup>
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
          )}

          {isEmailVerified && errors.code && (
            <p className="text-danger">Code is required</p>
          )}
          {isEmailVerified && (
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
          )}

          {isEmailVerified &&
            errors.newPassword &&
            errors.newPassword.type === 'required' && (
              <p className="text-danger">New Password is required</p>
            )}
          {isEmailVerified && (
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
          )}

          {isEmailVerified &&
            errors.confirmPassword &&
            errors.confirmPassword.type === 'required' && (
              <p className="text-danger">Confirm Password is required</p>
            )}
          {isEmailVerified &&
            errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <p className="text-danger">Confirm Password not match</p>
            )}
          <Button
            color="primary"
            size="md"
            type="submit"
            className="mr-1"
            disabled={state.loginLoader}
          >
            Submit
          </Button>
          <LinkButton color="link" size="md" tag={Link} to="/login">
            Sign in with another user
          </LinkButton>
          {state.loginLoader && isEmailVerified && (
            <LoginLoader message="Authenticating User" />
          )}
          {state.loginLoader && !isEmailVerified && (
            <LoginLoader message="Verifying Email" />
          )}
          <p className="mt-5 mb-3 text-muted text-center">
            &copy; WallBee 2020
          </p>
        </Form>
      </LoginBox>
    </React.Fragment>
  );
}

ForgotPassword.propTypes = {
  onSubmitForm: PropTypes.func,
  state: PropTypes.object,
  location: PropTypes.object,
  onLoadResetState: PropTypes.func,
  onEmailVerify: PropTypes.func,
  onResendActivation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectResponse(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onEmailVerify: data => {
      dispatch(emailVerifyAction(data.email));
    },
    onSubmitForm: data => {
      dispatch(
        updatePasswordAction(
          data.email,
          data.code,
          data.newPassword,
          data.confirmPassword,
        ),
      );
    },
    onLoadResetState: () => {
      dispatch(resetStateAction());
    },
    onResendActivation: email => {
      dispatch(resendActivationCodeAction(email));
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
)(ForgotPassword);
