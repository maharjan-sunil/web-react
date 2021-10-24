import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectScan = state => state.scanPage || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectScan,
    scanState => scanState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectScan,
    scanState => scanState.error,
  );

const makeSelectScans = () =>
  createSelector(
    selectScan,
    scanState => scanState.scans,
  );

const makeSelectScan = () =>
  createSelector(
    selectScan,
    scanState => scanState.scan,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectScan,
    scanState => scanState.statusCode,
  );

const makeSelectActionLoader = () =>
  createSelector(
    selectScan,
    scanState => scanState.actionLoading,
  );

const makeSelectPage = () =>
  createSelector(
    selectScan,
    scanState => scanState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectScan,
    scanState => scanState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectScan,
    scanState => scanState.total,
  );

const makeSelectRow = () =>
  createSelector(
    selectScan,
    scanState => scanState.selectedRow,
  );
const makeSelectResult = () =>
  createSelector(
    selectScan,
    scanState => scanState.result,
  );
export {
  selectScan,
  makeSelectLoading,
  makeSelectError,
  makeSelectScans,
  makeSelectScan,
  makeSelectStatusCode,
  makeSelectActionLoader,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectRow,
  makeSelectResult,
};
