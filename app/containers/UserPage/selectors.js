import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state => state.userPage || initialState;

const makeSelectUsers = () =>
  createSelector(
    selectUser,
    userState => userState.users,
  );

const makeSelectUser = () =>
  createSelector(
    selectUser,
    userState => userState.user,
  );

const makeSelectResult = () =>
  createSelector(
    selectUser,
    userState => userState.result,
  );

const makeSelectPage = () =>
  createSelector(
    selectUser,
    userState => userState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectUser,
    userState => userState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectUser,
    userState => userState.total,
  );

const makeSelectError = () =>
  createSelector(
    selectUser,
    userState => userState.error,
  );

const makeSelectLoader = () =>
  createSelector(
    selectUser,
    userState => userState.loading,
  );

const makeSelectActionLoader = () =>
  createSelector(
    selectUser,
    userState => userState.actionLoading,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectUser,
    userState => userState.statusCode,
  );

const makeSelectRow = () =>
  createSelector(
    selectUser,
    userState => userState.selectedRow,
  );

export {
  selectUser,
  makeSelectUsers,
  makeSelectUser,
  makeSelectResult,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectError,
  makeSelectLoader,
  makeSelectActionLoader,
  makeSelectStatusCode,
  makeSelectRow,
};
