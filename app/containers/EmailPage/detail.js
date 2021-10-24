/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { FormattedMessage } from 'react-intl';

import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper, { DetailWrapper } from 'components/PageWrapper';
import LoaderIndicator from 'components/Loader';
import { PageHeader } from 'components/Page/PageHeader';
import {
  InfoDetailWrap,
  InfoDetail,
  InfoDetailRow,
  DetailLabel,
  DetailValue,
} from 'components/Page/StyledDetail';
import {
  makeSelectEmail,
  makeSelectError,
  makeSelectLoader,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import { getEmailAction } from './actions';
import messages from './messages';

export function detail({ match, onLoad, email, error, loading }) {
  useInjectReducer({ key: 'emailPage', reducer });
  useInjectSaga({ key: 'emailPage', saga });

  const { id } = match.params;

  useEffect(() => {
    onLoad(id);
  }, []);

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader pageTitle="Email Detail" back="true" />
        <DetailWrapper>
          <EmailDetail loading={loading} error={error} email={email} />
        </DetailWrapper>
      </PageWrapper>
    </React.Fragment>
  );
}

function EmailDetail(props) {
  if (props.loading) {
    return <LoaderIndicator />;
  }
  if (props.error) {
    return <React.Fragment>Error occurred</React.Fragment>;
  }
  return (
    <React.Fragment>
      <InfoDetailWrap>
        <InfoDetail>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.shipmentId} />
            </DetailLabel>
            <DetailValue>{props.email.shipmentId}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.awb} />
            </DetailLabel>
            <DetailValue>{props.email.awb}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.to} />
            </DetailLabel>
            <DetailValue>{props.email.to}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.cc} />
            </DetailLabel>
            <DetailValue>{props.email.cc}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.bcc} />
            </DetailLabel>
            <DetailValue>{props.email.bcc}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.subject} />
            </DetailLabel>
            <DetailValue>{props.email.subject}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.body} />
            </DetailLabel>
            <DetailValue>{props.email.body}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.statusText} />
            </DetailLabel>
            <DetailValue>{props.email.statusText}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.typeText} />
            </DetailLabel>
            <DetailValue>{props.email.typeText}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.applicationName} />
            </DetailLabel>
            <DetailValue>{props.email.applicationName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.smtp} />
            </DetailLabel>
            <DetailValue>{props.email.smtp}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.isHtml} />
            </DetailLabel>
            <DetailValue>{props.email.isHtml ? 'Yes' : 'No'}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.isGetDeleted} />
            </DetailLabel>
            <DetailValue>{props.email.isGetDeleted ? 'Yes' : 'No'}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.createdAt} />
            </DetailLabel>
            <DetailValue>{props.email.createdAt}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.createdBy} />
            </DetailLabel>
            <DetailValue>{props.email.createdBy}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.updatedAt} />
            </DetailLabel>
            <DetailValue>{props.email.updatedAt}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.updatedBy} />
            </DetailLabel>
            <DetailValue>{props.email.updatedBy}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.deletedAt} />
            </DetailLabel>
            <DetailValue>{props.email.deletedAt}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.deletedBy} />
            </DetailLabel>
            <DetailValue>{props.email.deletedBy}</DetailValue>
          </InfoDetailRow>
        </InfoDetail>
      </InfoDetailWrap>
    </React.Fragment>
  );
}

detail.propTypes = {
  match: PropTypes.any,
  onLoad: PropTypes.func,
  email: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  error: makeSelectError(),
  loading: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getEmailAction(id));
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
)(detail);
