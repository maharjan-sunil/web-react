import { createSelector } from 'reselect';
import { initialState } from 'containers/FileErrorLogPage/reducer';
const selectFileError = state => state.fileErrorLogPage || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.error,
  );

const makeSelectFileErrors = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.fileErrors,
  );

const makeSelectFileError = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.fileError,
  );

const makeSelectPage = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.total,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.statusCode,
  );

const makeSelectRow = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.selectedRow,
  );

const makeSelectResult = () =>
  createSelector(
    selectFileError,
    fileErrorState => fileErrorState.result,
  );

export {
  makeSelectLoading,
  makeSelectError,
  makeSelectFileErrors,
  makeSelectFileError,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
  makeSelectRow,
  makeSelectResult,
};
