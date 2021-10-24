/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { PageHeader } from 'components/Page/PageHeader';
import PageWrapper from 'components/PageWrapper';
import Navbar from 'components/Navbar';
import ShipmentBody from 'components/Shipment';
import Body from 'components/Body';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoaderIndicator from 'components/Loader';
import reducer from './reducer';
import saga from './saga';
import { getShipmentDetailAction } from './actions';
import {
  makeSelectshipmentInfo,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
const key = 'DataConnectionPage';

export function shipmentDetail({ match, shipment, onLoad, loading, error }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { id } = match.params;

  useEffect(() => {
    onLoad(id);
  }, []);
  if (loading || !shipment.senderAddress) {
    return <LoaderIndicator />;
  }

  if (error) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader pageTitle="Shipment Detail" back="true" />
        <ShipmentBody shipment={shipment} />
      </PageWrapper>
    </React.Fragment>
  );
}

shipmentDetail.propTypes = {
  match: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  shipment: PropTypes.object,
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  shipment: makeSelectshipmentInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => dispatch(getShipmentDetailAction(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(shipmentDetail);
