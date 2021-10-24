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
import { Img } from '@bootstrap-styled/v4';

import { PageHeader } from 'components/Page/PageHeader';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper, { DetailWrapper } from 'components/PageWrapper';
import LoaderIndicator from 'components/Loader';
import {
  InfoDetailWrap,
  InfoDetail,
  InfoDetailRow,
  DetailLabel,
  DetailValue,
} from 'components/Page/StyledDetail';
import { makeSelectUser, makeSelectError, makeSelectLoader } from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import { getUserAction } from './actions';
import messages from './messages';

export function detail({ match, onLoad, user, error, loading }) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });

  const { id } = match.params;

  useEffect(() => {
    onLoad(id);
  }, []);

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader
          pageTitle="User Detail"
          back="true"
          editUrl={`/users/edit/${user.id}`}
        />
        <DetailWrapper>
          <UserDetail loading={loading} error={error} user={user} />
        </DetailWrapper>
      </PageWrapper>
    </React.Fragment>
  );
}

function UserDetail(props) {
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
              <FormattedMessage {...messages.name} />
            </DetailLabel>
            <DetailValue>{props.user.name}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.email} />
            </DetailLabel>
            <DetailValue>{props.user.email}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.mobile} />
            </DetailLabel>
            <DetailValue>{props.user.mobile}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.gender} />
            </DetailLabel>
            <DetailValue>{props.user.genderText}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.profile} />
            </DetailLabel>
            <DetailValue>
              <Img
                name="profile"
                src={`data:image/jpeg;base64,${props.user.image}`}
              />
            </DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.status} />
            </DetailLabel>
            <DetailValue>
              {props.user.isActive ? 'Active' : 'Inactive'}
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
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  error: makeSelectError(),
  loading: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getUserAction(id));
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
