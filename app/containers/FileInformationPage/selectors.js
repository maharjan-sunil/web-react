import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectFile = state => state.fileInformationPage || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectFile,
    fileState => fileState.loading,
  );
const makeSelectContentLoading = () =>
  createSelector(
    selectFile,
    fileState => fileState.contentLoading,
  );
const makeSelectError = () =>
  createSelector(
    selectFile,
    fileState => fileState.error,
  );

const makeSelectFiles = () =>
  createSelector(
    selectFile,
    fileState => fileState.files,
  );

const makeSelectFile = () =>
  createSelector(
    selectFile,
    fileState => fileState.file,
  );

const makeSelectFileContent = () =>
  createSelector(
    selectFile,
    fileState => fileState.fileContent,
  );

const makeSelectPage = () =>
  createSelector(
    selectFile,
    fileState => fileState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectFile,
    fileState => fileState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectFile,
    fileState => fileState.total,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectFile,
    fileState => fileState.statusCode,
  );

const makeSelectRow = () =>
  createSelector(
    selectFile,
    fileState => fileState.selectedRow,
  );
export {
  makeSelectLoading,
  makeSelectContentLoading,
  makeSelectError,
  makeSelectFiles,
  makeSelectFile,
  makeSelectFileContent,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
  makeSelectRow,
};
