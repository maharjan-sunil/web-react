import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectNotMapped = state => state.NotMappedPage || initialState;
const makeSelectLoading = () =>
  createSelector(
    selectNotMapped,
    notMappedState => notMappedState.loading,
  );
const makeSelectError = () =>
  createSelector(
    selectNotMapped,
    notMappedState => notMappedState.error,
  );
const makeSelectNotMapped = () =>
  createSelector(
    selectNotMapped,
    notMappedState => notMappedState.notMapped,
  );

const makeSelectPage = () =>
  createSelector(
    selectNotMapped,
    notMappedState => notMappedState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectNotMapped,
    notMappedState => notMappedState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectNotMapped,
    notMappedState => notMappedState.total,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectNotMapped,
    notMappedState => notMappedState.statusCode,
  );
export {
  makeSelectNotMapped,
  makeSelectLoading,
  makeSelectError,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
};
