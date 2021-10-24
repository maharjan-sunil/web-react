import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectdataconnection = state => state.DataConnectionPage || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.loading,
  );
const makeSelectError = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.error,
  );
const makeSelectshipmentInfo = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.shipment,
  );
const makeSelectdataconnections = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.dataconnections,
  );
const makeSelectdataconnection = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.dataconnection,
  );
const makeSelectPage = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.total,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.statusCode,
  );
const makeSelectRow = () =>
  createSelector(
    selectdataconnection,
    dataconnectionState => dataconnectionState.selectedRow,
  );

export {
  selectdataconnection,
  makeSelectLoading,
  makeSelectError,
  makeSelectdataconnections,
  makeSelectdataconnection,
  makeSelectshipmentInfo,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
  makeSelectRow,
};
