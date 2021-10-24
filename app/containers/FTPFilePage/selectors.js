import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFTPFile = state => state.ftpFilePage || initialState;

const makeSelectFTPFiles = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.ftpFiles,
  );

const makeSelectFTPFile = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.ftpFile,
  );

const makeSelectResult = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.result,
  );

const makeSelectError = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.error,
  );

const makeSelectLoader = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.loading,
  );

const makeSelectActionLoader = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.actionLoading,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.statusCode,
  );

const makeSelectPage = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.total,
  );

const makeSelectFileContent = () =>
  createSelector(
    selectFTPFile,
    ftpFileState => ftpFileState.fileContent,
  );

export {
  selectFTPFile,
  makeSelectFTPFiles,
  makeSelectFTPFile,
  makeSelectResult,
  makeSelectError,
  makeSelectLoader,
  makeSelectActionLoader,
  makeSelectStatusCode,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectFileContent,
};
