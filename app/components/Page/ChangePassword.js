/* eslint-disable react/prop-types */
import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import toastr from 'toastr';

import {
  Form,
  Label,
  Button,
  Row,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@bootstrap-styled/v4';
import { StyledFormGroup, StyledInput } from 'components/StyledInput';
import saga from './saga';
import { changePasswordAction, resetChangePasswordStore } from './actions';
import reducer from './reducer';
import { makeSelectResponse } from './selectors';

export function ChangePassword(props) {
  useInjectReducer({ key: 'page', reducer });
  useInjectSaga({ key: 'page', saga });

  const [{ isRegister }, setState] = useState({ isRegister: false });

  const { register, handleSubmit, setValue, errors, watch, reset } = useForm();
  const danger = {
    color: '#a30000',
  };

  useEffect(() => {
    registerFormData();
    setState({ isRegister: true });
  }, []);

  function registerFormData() {
    register({ name: 'currentPassword' }, { required: 'Required' });
    register(
      { name: 'newPassword' },
      {
        required: 'Required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters long',
        },
      },
    );
    register(
      { name: 'confirmationPassword' },
      {
        required: 'Required',
        validate: value =>
          value === watch('newPassword') || "Passwords don't match.",
      },
    );
  }

  let action;
  if (props.response.statusCode === 406 && !props.response.changePassword) {
    action = (
      <Col md="12">
        <Alert color="danger">Invalid Password</Alert>
      </Col>
    );
  } else if (isRegister && props.response.changePassword) {
    props.onSubmitHandler();
    toastr.success('Password Changed!');
    props.resetChangePasswordStore();
    setState({ isRegister: false });
  } else if (
    !props.isShowDialog &&
    !isRegister &&
    props.response.statusCode === 0
  ) {
    ResetForm();
  }

  function ResetForm() {
    reset();
    registerFormData();
    setState({ isRegister: true });
  }

  return (
    <React.Fragment>
      <Modal isOpen={props.isShowDialog}>
        <ModalHeader
          toggle={() => {
            ResetForm();
            props.resetChangePasswordStore();
            props.onCloseHandler();
          }}
        >
          Change Password
        </ModalHeader>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(props.onSubmitForm)}>
              <ModalBody />
              {action}
              <Col md="12">
                <StyledFormGroup>
                  <StyledInput
                    name="currentPassword"
                    type="password"
                    placeholder="Current Password"
                    onChange={e => {
                      setValue('currentPassword', e.currentTarget.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                  <Label htmlFor="currentPassword">Current Password</Label>
                </StyledFormGroup>
                {errors.currentPassword && (
                  <p style={danger}>{errors.currentPassword.message}</p>
                )}
              </Col>
              <Col md="12">
                <StyledFormGroup>
                  <StyledInput
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    onChange={e => {
                      setValue('newPassword', e.currentTarget.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                  <Label htmlFor="newPassword">New Password</Label>
                </StyledFormGroup>
                {errors.newPassword && (
                  <p style={danger}>{errors.newPassword.message}</p>
                )}
              </Col>
              <Col md="12">
                <StyledFormGroup>
                  <StyledInput
                    name="confirmationPassword"
                    type="password"
                    placeholder="Confirmation Password"
                    onChange={e => {
                      setValue('confirmationPassword', e.currentTarget.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                  <Label htmlFor="confirmationPassword">
                    Confirmation Password
                  </Label>
                </StyledFormGroup>
                {errors.confirmationPassword && (
                  <p style={danger}>{errors.confirmationPassword.message}</p>
                )}
              </Col>
              <ModalFooter>
                <Button type="submit" color="primary" size="lg">
                  Save
                </Button>
                <Button
                  type="button"
                  size="lg"
                  color="secondary"
                  onClick={() => {
                    ResetForm();
                    props.resetChangePasswordStore();
                    props.onCloseHandler();
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Col>
        </Row>
      </Modal>
    </React.Fragment>
  );
}

ChangePassword.propTypes = {
  onSubmitForm: PropTypes.func,
  resetChangePasswordStore: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  response: makeSelectResponse(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: data => dispatch(changePasswordAction(data)),
    resetChangePasswordStore: () => dispatch(resetChangePasswordStore()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChangePassword);
