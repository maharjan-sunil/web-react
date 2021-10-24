import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectShipmentLog = state => state.logPage || initialState;

const makeSelectLogs = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.logs,
  );

const makeSelectShipmentLog = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.log,
  );

const makeSelectShipmentLogShipment = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.shipment,
  );

const makeSelectPage = () =>
  createSelector(
    selectShipmentLog,
    userState => userState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectShipmentLog,
    userState => userState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectShipmentLog,
    userState => userState.total,
  );

const makeSelectError = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.error,
  );

const makeSelectLoading = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.loading,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.statusCode,
  );
const makeSelectResponse = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.shipmentResponse,
  );

const makeSelectRequest = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.shipmentRequest,
  );

const makeSelectRow = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.selectedRow,
  );

const makeSelectRequestResponse = () =>
  createSelector(
    selectShipmentLog,
    logState => logState.requestResponse,
  );

export {
  selectShipmentLog,
  makeSelectLogs,
  makeSelectShipmentLog,
  makeSelectShipmentLogShipment,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectError,
  makeSelectLoading,
  makeSelectStatusCode,
  makeSelectResponse,
  makeSelectRequest,
  makeSelectRow,
  makeSelectRequestResponse,
};
