/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
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
  Select,
  Option,
} from '@bootstrap-styled/v4';
import { StyledFormGroup, StyledInput } from 'components/StyledInput';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import LoaderIndicator, { ActionLoader } from 'components/Loader';
import PageWrapper from 'components/PageWrapper';
import PageTitle from 'components/PageTitle';
import PageTitleText from 'components/PageTitleText';
import {
  makeSelectSiteAccount,
  makeSelectError,
  makeSelectLoader,
  makeSelectResult,
  makeSelectCreateSelectList,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import {
  getSiteAccountAction,
  insertSiteAccountAction,
  updateSiteAccountAction,
  getCreateSelectListAction,
} from './actions';
export function save({
  match,
  onLoadSelectList,
  onLoad,
  onSubmit,
  siteAccount,
  result,
  history,
  createSelectList,
  loading,
}) {
  useInjectReducer({ key: 'siteAccountPage', reducer });
  useInjectSaga({ key: 'siteAccountPage', saga });

  const { register, handleSubmit, setValue, errors } = useForm();
  const { id } = match.params;
  const [
    { siteID, carrierID, accountNumber, isDataConnection, isScan },
    setDefaultValue,
  ] = useState({
    id: 0,
    siteID: '',
    carrierID: '',
    accountNumber: '',
    isDataConnection: false,
    isScan: false,
  });
  const [isSetValue, updateFlag] = useState(true);

  useEffect(() => {
    register({ name: 'id' });
    register({ name: 'siteID' }, { required: true });
    register({ name: 'carrierID' }, { required: true });
    register({ name: 'accountNumber' }, { required: true });
    register({ name: 'isDataConnection' });
    register({ name: 'isScan' });
    register({ name: 'dataStatus' });
    setValue('dataStatus', 1);
    onLoadSelectList();
    if (id) {
      updateFlag(false);
      onLoad(id);
    }
  }, [register]);
  if (result && result > 0) {
    history.push('/site-accounts');
  }
  if (
    id &&
    siteAccount &&
    id === `${siteAccount.id}` &&
    createSelectList !== false &&
    !isSetValue
  ) {
    updateFlag(true);
    setDefaultValue({
      id: siteAccount.id,
      siteID: siteAccount.siteID,
      carrierID: siteAccount.carrierID,
      accountNumber: siteAccount.accountNumber,
      isDataConnection: siteAccount.isDataConnection,
      isScan: siteAccount.isScan,
    });
    setValue('id', siteAccount.id);
    setValue('dataStatus', 2);
    setValue('siteID', siteAccount.siteID);
    setValue('carrierID', siteAccount.carrierID);
    setValue('accountNumber', siteAccount.accountNumber);
    setValue('isDataConnection', siteAccount.isDataConnection);
    setValue('isScan', siteAccount.isScan);
  }

  if (isSetValue) {
    return (
      <React.Fragment>
        <Body />
        <Navbar />
        <PageWrapper>
          <PageTitle>
            <PageTitleText>Site Account Save</PageTitleText>
          </PageTitle>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Col md="12">
                  <StyledFormGroup>
                    <Select
                      className="form-control"
                      name="siteID"
                      id="siteID"
                      defaultValue={siteID}
                      onChange={e => {
                        setValue('siteID', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      <Option value=""> Select Site</Option>
                      {createSelectList !== false &&
                        createSelectList.sites.map((data, i) => (
                          <Option key={i} value={data.id}>
                            {data.name}
                          </Option>
                        ))}
                    </Select>
                  </StyledFormGroup>
                  {errors.siteID && <p className="text-danger">Required</p>}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <Select
                      className="form-control"
                      name="carrierID"
                      id="carrierID"
                      defaultValue={carrierID}
                      onChange={e => {
                        setValue('carrierID', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    >
                      <Option value=""> Select Carrier</Option>
                      {createSelectList !== false &&
                        createSelectList.carriers.map((data, i) => (
                          <Option key={i} value={data.id}>
                            {data.name}
                          </Option>
                        ))}
                    </Select>
                  </StyledFormGroup>
                  {errors.carrierID && <p className="text-danger">Required</p>}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="accountNumber"
                      type="text"
                      placeholder="Account Number"
                      defaultValue={accountNumber}
                      onChange={e => {
                        setValue('accountNumber', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                    <Label htmlFor="accountNumber">Account Number</Label>
                  </StyledFormGroup>
                  {errors.accountNumber && (
                    <p className="text-danger">Required</p>
                  )}
                </Col>
                <Col md="12" className="mb-3">
                  <Row>
                    <Col md="2">
                      <Label htmlFor="isDataConnection">Data Connection</Label>
                    </Col>
                    <Col md="2">
                      <StyledInput
                        name="isDataConnection"
                        type="checkbox"
                        defaultChecked={isDataConnection}
                        onChange={e => {
                          setValue(
                            'isDataConnection',
                            e.currentTarget.checked,
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            },
                          );
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md="12" className="mb-3">
                  <Row>
                    <Col md="2">
                      <Label htmlFor="isScan">Scan</Label>
                    </Col>
                    <Col md="2">
                      <StyledInput
                        name="isScan"
                        type="checkbox"
                        defaultChecked={isScan}
                        onChange={e => {
                          setValue('isScan', e.currentTarget.checked, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md="12">
                  <Button color="primary" size="lg">
                    Save
                  </Button>
                </Col>
                {loading && <ActionLoader />}
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
  onLoadSelectList: PropTypes.func,
  onLoad: PropTypes.func,
  onSubmit: PropTypes.func,
  siteAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  history: PropTypes.object,
  createSelectList: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  createSelectList: makeSelectCreateSelectList(),
  siteAccount: makeSelectSiteAccount(),
  error: makeSelectError(),
  loading: makeSelectLoader(),
  result: makeSelectResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadSelectList: () => {
      dispatch(getCreateSelectListAction());
    },
    onLoad: id => {
      dispatch(getSiteAccountAction(id));
    },
    onSubmit: data => {
      if (data.dataStatus === 1) {
        dispatch(insertSiteAccountAction(data));
      } else {
        dispatch(updateSiteAccountAction(data));
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
