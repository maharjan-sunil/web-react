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
import Navbar from 'components/Navbar';
import PageTitle from 'components/PageTitle';
import PageTitleText from 'components/PageTitleText';
import LinkButton from 'components/LinkButton';
import LoaderIndicator from 'components/Loader';
import {
  InfoDetailWrap,
  InfoDetail,
  InfoDetailRow,
  DetailLabel,
  DetailValue,
} from 'components/Page/StyledDetail';
import PageWrapper, { DetailWrapper } from 'components/PageWrapper';
import saga from './saga';
import { makeSelectSite, makeSelectError, makeSelectLoader } from './selectors';
import { reducer } from './reducer';
import { getSiteAction } from './actions';
import messages from './messages';

export function detail({ match, onLoad, site, error, loading }) {
  useInjectReducer({ key: 'sitePage', reducer });
  useInjectSaga({ key: 'sitePage', saga });

  const { siteId } = match.params;

  useEffect(() => {
    onLoad(siteId);
  }, []);

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageTitle>
          <PageTitleText>
            <FormattedMessage {...messages.details} />
          </PageTitleText>
        </PageTitle>
        <DetailWrapper>
          <SiteDetail loading={loading} error={error} site={site} />
        </DetailWrapper>
      </PageWrapper>
    </React.Fragment>
  );
}

function SiteDetail(props) {
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
          <LinkButton tag={Link} to={`/sites/edit/${props.site.siteId}`}>
            <FormattedMessage {...messages.edit} />
          </LinkButton>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.siteId} />
            </DetailLabel>
            <DetailValue>{props.site.siteId}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.siteName} />
            </DetailLabel>
            <DetailValue>{props.site.siteName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.siteUsername} />
            </DetailLabel>
            <DetailValue>{props.site.siteUsername}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.siteFTPIp} />
            </DetailLabel>
            <DetailValue>{props.site.siteFTPIP}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.siteIp} />
            </DetailLabel>
            <DetailValue>{props.site.siteIP}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.ftpUsername} />
            </DetailLabel>
            <DetailValue>{props.site.ftpUsername}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.ftpPassword} />
            </DetailLabel>
            <DetailValue>{props.site.ftpPassword}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.comment} />
            </DetailLabel>
            <DetailValue>{props.site.comment}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.sendScan} />
            </DetailLabel>
            <DetailValue>{props.site.sendScan ? 'Yes' : 'No'}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.sendShipment} />
            </DetailLabel>
            <DetailValue>{props.site.sendShipment ? 'Yes' : 'No'}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.sendWSPOD} />
            </DetailLabel>
            <DetailValue>{props.site.sendWSPOD ? 'Yes' : 'No'}</DetailValue>
          </InfoDetailRow>
        </InfoDetail>
      </InfoDetailWrap>
    </React.Fragment>
  );
}

detail.propTypes = {
  match: PropTypes.any,
  onLoad: PropTypes.func,
  site: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  site: makeSelectSite(),
  error: makeSelectError(),
  loading: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: siteId => {
      dispatch(getSiteAction(siteId));
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
