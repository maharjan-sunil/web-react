/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Body from 'components/Body';
import LinkButton from 'components/LinkButton';
import Navbar from 'components/Navbar';
import PageWrapper, { DetailWrapper } from 'components/PageWrapper';
import LoaderIndicator from 'components/Loader';
import PageTitle from 'components/PageTitle';
import PageTitleText from 'components/PageTitleText';
import {
  InfoDetailWrap,
  InfoDetail,
  InfoDetailRow,
  DetailLabel,
  DetailValue,
} from 'components/Page/StyledDetail';
import {
  makeSelectSiteAccount,
  makeSelectError,
  makeSelectLoader,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import { getSiteAccountAction } from './actions';
import messages from './messages';

export function detail({ match, onLoad, siteAccount, error, loading }) {
  useInjectReducer({ key: 'siteAccountPage', reducer });
  useInjectSaga({ key: 'siteAccountPage', saga });

  const { id } = match.params;

  useEffect(() => {
    onLoad(id);
  }, []);

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageTitle>
          <PageTitleText>
            <FormattedMessage {...messages.detail} />
          </PageTitleText>
        </PageTitle>
        <DetailWrapper>
          <SiteAccountDetail
            loading={loading}
            error={error}
            siteAccount={siteAccount}
          />
        </DetailWrapper>
      </PageWrapper>
    </React.Fragment>
  );
}

function SiteAccountDetail(props) {
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
          <LinkButton
            tag={Link}
            to={`/site-accounts/edit/${props.siteAccount.id}`}
          >
            <FormattedMessage {...messages.edit} />
          </LinkButton>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.site} />
            </DetailLabel>
            <DetailValue>{props.siteAccount.siteName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.carrier} />
            </DetailLabel>
            <DetailValue>{props.siteAccount.carrierName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.accountNumber} />
            </DetailLabel>
            <DetailValue>{props.siteAccount.accountNumber}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.dataConnection} />
            </DetailLabel>
            <DetailValue>
              {props.siteAccount.isDataConnection ? 'Yes' : 'No'}
            </DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.scan} />
            </DetailLabel>
            <DetailValue>{props.siteAccount.isScan ? 'Yes' : 'No'}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.status} />
            </DetailLabel>
            <DetailValue>
              {props.siteAccount.deleted ? 'Inactive' : 'Active'}
            </DetailValue>
          </InfoDetailRow>
        </InfoDetail>
      </InfoDetailWrap>
    </React.Fragment>
  );
}

detail.propTypes = {
  match: PropTypes.any,
  onLoad: PropTypes.func,
  siteAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  siteAccount: makeSelectSiteAccount(),
  error: makeSelectError(),
  loading: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getSiteAccountAction(id));
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
