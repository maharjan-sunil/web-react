/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, memo } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  Row,
  Col,
  Form,
  Button,
  Label,
  Img,
  Select,
  Option,
} from '@bootstrap-styled/v4';

import { StyledFormGroup, StyledInput } from 'components/StyledInput';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import LoaderIndicator from 'components/Loader';
import PageTitle from 'components/PageTitle';
import PageTitleText from 'components/PageTitleText';
import {
  makeSelectUser,
  makeSelectError,
  makeSelectLoader,
  makeSelectResult,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import { getUserAction, insertUserAction, updateUserAction } from './actions';
import { Genders } from './enum';

export function save({ match, onLoad, onSubmit, user, result, history }) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });

  const { register, handleSubmit, setValue, errors } = useForm();
  const { id } = match.params;
  const [{ fileBase64 }, setImage] = useState({ fileBase64: '' });
  const [{ name, email, mobile, dob, gender }, setDefaultValue] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    gender: 0,
  });
  const [isSetValue, updateFlag] = useState(true);

  useEffect(() => {
    register({ name: 'name' }, { required: true });
    register({ name: 'email' }, { required: true });
    register({ name: 'mobile' }, { required: true });
    register({ name: 'dateOfBirth' }, { required: true });
    register({ name: 'gender' }, { required: true });
    register({ name: 'dataStatus' });
    register({ name: 'image' }, { required: true, maxLength: 300000 });
    setValue('dataStatus', 1);
    if (id) {
      updateFlag(false);
      register({ name: 'id' });
      onLoad(id);
    }
  }, [register]);

  const getBase64 = async (imageFile, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    // TO DO
    // eslint-disable-next-line func-names
    reader.onload = function() {
      cb(reader.result);
    };
  };

  if (result !== null && result.result > 0) {
    // eslint-disable-next-line react/no-this-in-sfc
    history.push('/users');
  }

  if (id && user && id === `${user.id}` && !isSetValue) {
    updateFlag(true);
    setDefaultValue({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      dob: new Date(user.dob).toISOString().substr(0, 10),
      gender: user.gender,
      image: user.image,
    });
    setValue('id', user.id);
    setValue('dataStatus', 2);
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('mobile', user.mobile);
    setValue('dateOfBirth', user.dateOfBirth);
    setValue('gender', user.gender);
    setValue('image', user.image);
    setImage({ fileBase64: `data:image/png;base64,${user.image}` });
  }
  if (isSetValue) {
    return (
      <React.Fragment>
        <Body />
        <Navbar />
        <PageWrapper>
          <PageTitle>
            <PageTitleText>User Save</PageTitleText>
          </PageTitle>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="name"
                      type="text"
                      placeholder="Name"
                      defaultValue={name}
                      onChange={e => {
                        setValue('name', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        setDefaultValue({ name: e.currentTarget.value });
                      }}
                    />
                    <Label htmlFor="name">Name</Label>
                  </StyledFormGroup>
                  {errors.name && <p className="text-danger">Required</p>}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="email"
                      type="text"
                      placeholder="Email"
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
                  {errors.email && <p className="text-danger">Required</p>}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="mobile"
                      type="text"
                      placeholder="Mobile"
                      defaultValue={mobile}
                      onChange={e => {
                        setValue('mobile', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                    <Label htmlFor="mobile">Mobile</Label>
                  </StyledFormGroup>
                  {errors.mobile && <p className="text-danger">Required</p>}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="dateOfBirth"
                      type="date"
                      placeholder="D.O.B"
                      defaultValue={dob}
                      onChange={e => {
                        setValue('dateOfBirth', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                    <Label htmlFor="dateOfBirth">D.O.B</Label>
                  </StyledFormGroup>
                  {errors.dateOfBirth && (
                    <p className="text-danger">Required</p>
                  )}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <Select
                      className="form-control"
                      name="gender"
                      id="gender"
                      defaultValue={gender}
                      onChange={e => {
                        setValue('gender', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      {Genders.map((data, i) => (
                        <Option key={i} value={data.id}>
                          {data.name}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormGroup>
                  {errors.gender && <p className="text-danger">Required</p>}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <Img src={fileBase64} thumbnail />
                    <StyledInput
                      name="imageFile"
                      type="file"
                      onChange={e => {
                        const selectedFile = e.target.files[0];
                        getBase64(selectedFile, base64 => {
                          setImage({
                            file: URL.createObjectURL(selectedFile),
                            fileBase64: base64,
                          });
                          setValue('image', base64.split(',')[1], {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        });
                      }}
                    />
                  </StyledFormGroup>
                  {errors.image && errors.image.type === 'required' && (
                    <p className="text-danger">Required</p>
                  )}
                  {errors.image && errors.image.type === 'maxLength' && (
                    <p className="text-danger"> File Size Upto 300KB</p>
                  )}
                </Col>
                <Button color="primary" size="lg">
                  Save
                </Button>
              </Form>
            </Col>
          </Row>
        </PageWrapper>
      </React.Fragment>
    );
  }
  return <LoaderIndicator />;
}

save.propTypes = {
  match: PropTypes.any,
  onLoad: PropTypes.func,
  onSubmit: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  result: PropTypes.any,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  error: makeSelectError(),
  loading: makeSelectLoader(),
  result: makeSelectResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getUserAction(id));
    },
    onSubmit: data => {
      if (data.dataStatus === 1) {
        dispatch(insertUserAction(data));
      } else {
        dispatch(updateUserAction(data));
      }
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
)(save);
