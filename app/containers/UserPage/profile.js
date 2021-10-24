/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import PageTitle from 'components/PageTitle';
import PageTitleText from 'components/PageTitleText';
import LoaderIndicator from 'components/Loader';
import {
  ProfileWrap,
  UserAvatar,
  UserDetail,
  UserDetailRow,
  UserProfileRow,
  StyledLable,
} from './styles';
import { makeSelectUser, makeSelectError, makeSelectLoader } from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import { getUserProfileAction } from './actions';

export function profile({ onLoad, user, error, loading }) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });

  useEffect(() => {
    onLoad();
  }, []);

  if (loading) {
    return <LoaderIndicator />;
  }
  if (error) {
    return <React.Fragment>Error occurred</React.Fragment>;
  }

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageTitle>
          <PageTitleText>My Profile</PageTitleText>
        </PageTitle>
        <ProfileWrap>
          <UserAvatar bgColor={`data:image/jpeg;base64,${user.image}`} />
          <UserDetail>
            <UserDetailRow>
              <StyledLable>User Name</StyledLable>
              <UserProfileRow>{user.name}</UserProfileRow>
            </UserDetailRow>
            <UserDetailRow>
              <StyledLable>Email</StyledLable>
              <UserProfileRow>{user.email}</UserProfileRow>
            </UserDetailRow>
            <UserDetailRow>
              <StyledLable>Mobile</StyledLable>
              <UserProfileRow>{user.mobile}</UserProfileRow>
            </UserDetailRow>
            <UserDetailRow>
              <StyledLable>DOB</StyledLable>
              <UserProfileRow>
                {new Date(user.dob).toDateString()}
              </UserProfileRow>
            </UserDetailRow>
            <UserDetailRow>
              <StyledLable>Status</StyledLable>
              <UserProfileRow>
                {user.isActive ? 'Active' : 'Inactive'}
              </UserProfileRow>
            </UserDetailRow>
          </UserDetail>
        </ProfileWrap>
      </PageWrapper>
    </React.Fragment>
  );
}

profile.propTypes = {
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
    onLoad: () => {
      dispatch(getUserProfileAction());
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
)(profile);
