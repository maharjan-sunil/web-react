import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEmail = state => state.emailPage || initialState;

const makeSelectEmails = () =>
  createSelector(
    selectEmail,
    emailState => emailState.emails,
  );

const makeSelectEmail = () =>
  createSelector(
    selectEmail,
    emailState => emailState.email,
  );

const makeSelectResult = () =>
  createSelector(
    selectEmail,
    emailState => emailState.result,
  );

const makeSelectPage = () =>
  createSelector(
    selectEmail,
    emailState => emailState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectEmail,
    emailState => emailState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectEmail,
    emailState => emailState.total,
  );

const makeSelectError = () =>
  createSelector(
    selectEmail,
    emailState => emailState.error,
  );

const makeSelectLoader = () =>
  createSelector(
    selectEmail,
    emailState => emailState.loading,
  );

const makeSelectActionLoader = () =>
  createSelector(
    selectEmail,
    emailState => emailState.actionLoading,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectEmail,
    emailState => emailState.statusCode,
  );

const makeSelectRow = () =>
  createSelector(
    selectEmail,
    emailState => emailState.selectedRow,
  );

export {
  selectEmail,
  makeSelectEmails,
  makeSelectEmail,
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
