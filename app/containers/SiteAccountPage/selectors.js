import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSiteAccount = state => state.siteAccountPage || initialState;

const makeSelectSiteAccounts = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.siteAccounts,
  );

const makeSelectSiteAccount = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.siteAccount,
  );

const makeSelectResult = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.result,
  );

const makeSelectError = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.error,
  );

const makeSelectLoader = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.loading,
  );

const makeSelectCreateSelectList = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.createSelectList,
  );

const makeSelectActionLoader = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.actionLoading,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.statusCode,
  );

const makeSelectPage = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectSiteAccount,
    siteAccountState => siteAccountState.total,
  );

export {
  selectSiteAccount,
  makeSelectSiteAccounts,
  makeSelectSiteAccount,
  makeSelectResult,
  makeSelectError,
  makeSelectLoader,
  makeSelectCreateSelectList,
  makeSelectActionLoader,
  makeSelectStatusCode,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
};
