/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, memo } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Row, Col, Form, Button, Label } from '@bootstrap-styled/v4';
import { FormattedMessage } from 'react-intl';
import { StyledFormGroup, StyledInput } from 'components/StyledInput';
import LoaderIndicator, { ActionLoader } from 'components/Loader';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import PageTitle from 'components/PageTitle';
import PageTitleText from 'components/PageTitleText';
import saga from './saga';
import messages from './messages';
import {
  makeSelectSite,
  makeSelectError,
  makeSelectLoader,
  makeSelectResult,
} from './selectors';
import { reducer } from './reducer';
import { getSiteAction, insertSiteAction, updateSiteAction } from './actions';

export function save({
  match,
  onLoad,
  onSubmit,
  site,
  result,
  history,
  loading,
}) {
  useInjectReducer({ key: 'sitePage', reducer });
  useInjectSaga({ key: 'sitePage', saga });

  const { register, handleSubmit, setValue, errors } = useForm();
  const { siteId } = match.params;
  const [
    {
      wallAppId,
      siteName,
      siteUsername,
      sitePassword,
      siteIP,
      siteFTPIP,
      ftpUsername,
      ftpPassword,
      comment,
      sendScan,
      sendShipment,
      sendWSPOD,
    },
    setDefaultValue,
  ] = useState({
    wallAppId: '',
    siteName: '',
    siteUsername: '',
    sitePassword: '',
    siteIP: '',
    siteFTPIP: '',
    ftpUsername: '',
    ftpPassword: '',
    comment: '',
    sendScan: false,
    sendShipment: false,
    sendWSPOD: false,
  });
  const [isSetValue, updateFlag] = useState(true);
  // let header = '';
  // let buttonText = '';
  // if (isCreate) {
  //   header = { ...messages.createSite };
  //   buttonText = { ...messages.create };
  // } else {
  //   header = { ...messages.editSite };
  //   buttonText = { ...messages.update };
  // }
  useEffect(() => {
    register(
      { name: 'siteId' },
      {
        required: true,
        pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      },
    );
    register(
      { name: 'wallAppId' },
      {
        required: true,
        pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      },
    );
    register({ name: 'siteName' }, { required: true });
    register({ name: 'siteUsername' });
    register({ name: 'sitePassword' });
    register({ name: 'siteIP' });
    register({ name: 'siteFTPIP' });
    register({ name: 'ftpUsername' });
    register({ name: 'ftpPassword' });
    register({ name: 'comment' });
    register({ name: 'sendScan' });
    register({ name: 'sendShipment' });
    register({ name: 'sendWSPOD' });
    register({ name: 'id' });
    if (siteId) {
      updateFlag(false);
      onLoad(siteId);
    }
  }, [register]);

  if (result && result > 0) {
    history.push('/sites');
  }

  if (siteId && site && siteId === `${site.siteId}` && !isSetValue) {
    updateFlag(true);
    setDefaultValue({
      siteId: site.siteId,
      wallAppId: site.wallAppId,
      siteName: site.siteName,
      siteUsername: site.siteUsername,
      sitePassword: site.sitePassword,
      siteIP: site.siteIP,
      siteFTPIP: site.siteFTPIP,
      ftpUsername: site.ftpUsername,
      ftpPassword: site.ftpPassword,
      comment: site.comment,
      sendScan: site.sendScan,
      sendShipment: site.sendShipment,
      sendWSPOD: site.sendWSPOD,
      id: 1,
    });
    setValue('id', 1);
    setValue('siteId', site.siteId);
    setValue('wallAppId', site.wallAppId);
    setValue('siteName', site.siteName);
    setValue('siteUsername', site.siteUsername);
    setValue('sitePassword', site.sitePassword);
    setValue('siteIP', site.siteIP);
    setValue('siteFTPIP', site.siteFTPIP);
    setValue('ftpUsername', site.ftpUsername);
    setValue('ftpPassword', site.ftpPassword);
    setValue('comment', site.comment);
    setValue('sendScan', site.sendScan);
    setValue('sendShipment', site.sendShipment);
    setValue('sendWSPOD', site.sendWSPOD);
  }
  if (isSetValue) {
    return (
      <React.Fragment>
        <Body />
        <Navbar />
        <PageWrapper>
          <PageTitle>
            <PageTitleText>Save Site</PageTitleText>
          </PageTitle>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="siteId"
                      type="text"
                      placeholder="Site Id"
                      defaultValue={siteId}
                      disabled={siteId !== undefined}
                      onChange={e => {
                        setValue('siteId', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        setDefaultValue({ siteId: e.currentTarget.value });
                      }}
                    />
                    <Label htmlFor="siteId">
                      <FormattedMessage {...messages.siteId} />
                    </Label>
                  </StyledFormGroup>
                  {errors.siteId && (
                    <p className="text-danger">
                      <FormattedMessage {...messages.guidRequired} />
                    </p>
                  )}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="wallAppId"
                      type="text"
                      placeholder="Wall AppId"
                      defaultValue={wallAppId}
                      onChange={e => {
                        setValue('wallAppId', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        setDefaultValue({ siteId: e.currentTarget.value });
                      }}
                    />
                    <Label htmlFor="wallAppId">
                      <FormattedMessage {...messages.wallAppId} />
                    </Label>
                  </StyledFormGroup>
                  {errors.wallAppId && (
                    <p className="text-danger">
                      <FormattedMessage {...messages.guidRequired} />
                    </p>
                  )}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="siteName"
                      type="text"
                      placeholder="Site Name"
                      defaultValue={siteName}
                      onChange={e => {
                        setValue('siteName', e.currentTarget.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        setDefaultValue({ name: e.currentTarget.value });
                      }}
                    />
                    <Label htmlFor="siteName">
                      <FormattedMessage {...messages.siteName} />
                    </Label>
                  </StyledFormGroup>
                  {errors.siteName && (
                    <p className="text-danger">
                      <FormattedMessage {...messages.required} />
                    </p>
                  )}
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="siteUsername"
                      type="text"
                      placeholder="Site Username"
                      defaultValue={siteUsername}
                      onChange={e => {
                        setValue('siteUsername', e.currentTarget.value);
                      }}
                    />
                    <Label htmlFor="siteUsername">
                      <FormattedMessage {...messages.siteUsername} />
                    </Label>
                  </StyledFormGroup>
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="sitePassword"
                      type="text"
                      placeholder="Site Password"
                      defaultValue={sitePassword}
                      onChange={e => {
                        setValue('sitePassword', e.currentTarget.value);
                      }}
                    />
                    <Label htmlFor="sitePassword">
                      <FormattedMessage {...messages.sitePassword} />
                    </Label>
                  </StyledFormGroup>
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="siteIP"
                      type="text"
                      placeholder="Site IP"
                      defaultValue={siteIP}
                      onChange={e => {
                        setValue('siteIP', e.currentTarget.value);
                      }}
                    />
                    <Label htmlFor="siteIP">
                      <FormattedMessage {...messages.siteIp} />
                    </Label>
                  </StyledFormGroup>
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="siteFTPIP"
                      type="text"
                      placeholder="Site FTP IP"
                      defaultValue={siteFTPIP}
                      onChange={e => {
                        setValue('siteFTPIP', e.currentTarget.value);
                      }}
                    />
                    <Label htmlFor="siteFTPIP">
                      <FormattedMessage {...messages.siteFTPIp} />
                    </Label>
                  </StyledFormGroup>
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="ftpUsername"
                      type="text"
                      placeholder="FTP Username"
                      defaultValue={ftpUsername}
                      onChange={e => {
                        setValue('ftpUsername', e.currentTarget.value);
                      }}
                    />
                    <Label htmlFor="ftpUsername">
                      <FormattedMessage {...messages.ftpUsername} />
                    </Label>
                  </StyledFormGroup>
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="ftpPassword"
                      type="text"
                      placeholder="FTP Password"
                      defaultValue={ftpPassword}
                      onChange={e => {
                        setValue('ftpPassword', e.currentTarget.value);
                      }}
                    />
                    <Label htmlFor="ftpPassword">
                      <FormattedMessage {...messages.ftpPassword} />
                    </Label>
                  </StyledFormGroup>
                </Col>
                <Col md="12">
                  <StyledFormGroup>
                    <StyledInput
                      name="comment"
                      type="textarea"
                      placeholder="Comment"
                      defaultValue={comment}
                      onChange={e => {
                        setValue('comment', e.currentTarget.value);
                      }}
                    />
                    <Label htmlFor="comment">
                      <FormattedMessage {...messages.comment} />
                    </Label>
                  </StyledFormGroup>
                </Col>
                <Col md="12" className="mb-3">
                  <Row>
                    <Col md="2">
                      <Label htmlFor="sendScan">
                        <FormattedMessage {...messages.sendScan} />
                      </Label>
                    </Col>
                    <Col md="2">
                      <StyledInput
                        name="sendScan"
                        type="checkbox"
                        defaultChecked={sendScan}
                        onChange={e => {
                          setValue('sendScan', e.currentTarget.checked, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md="12" className="mb-3">
                  <Row>
                    <Col md="2">
                      <Label htmlFor="sendShipment">
                        <FormattedMessage {...messages.sendShipment} />
                      </Label>
                    </Col>
                    <Col md="2">
                      <StyledInput
                        name="sendShipment"
                        type="checkbox"
                        defaultChecked={sendShipment}
                        onChange={e => {
                          setValue('sendShipment', e.currentTarget.checked, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md="12" className="mb-3">
                  <Row>
                    <Col md="2">
                      <Label htmlFor="sendWSPOD">
                        <FormattedMessage {...messages.sendWSPOD} />
                      </Label>
                    </Col>
                    <Col md="2">
                      <StyledInput
                        name="sendWSPOD"
                        type="checkbox"
                        defaultChecked={sendWSPOD}
                        onChange={e => {
                          setValue('sendWSPOD', e.currentTarget.checked, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col md="1">
                      <Button color="primary" size="md">
                        Save
                      </Button>
                    </Col>
                    {loading && <ActionLoader />}
                  </Row>
                </Col>
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
  site: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  history: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  site: makeSelectSite(),
  error: makeSelectError(),
  loading: makeSelectLoader(),
  result: makeSelectResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getSiteAction(id));
    },
    onSubmit: data => {
      if (data.id > 0) {
        dispatch(updateSiteAction(data));
      } else {
        dispatch(insertSiteAction(data));
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
