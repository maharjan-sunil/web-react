import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSite = state => state.sitePage || initialState;

const makeSelectLoader = () =>
  createSelector(
    selectSite,
    siteState => siteState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectSite,
    siteState => siteState.error,
  );

const makeSelectSites = () =>
  createSelector(
    selectSite,
    siteState => siteState.sites,
  );

const makeSelectSite = () =>
  createSelector(
    selectSite,
    siteState => siteState.site,
  );

const makeSelectResult = () =>
  createSelector(
    selectSite,
    siteState => siteState.result,
  );

const makeSelectPage = () =>
  createSelector(
    selectSite,
    siteState => siteState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectSite,
    siteState => siteState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectSite,
    siteState => siteState.total,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectSite,
    siteState => siteState.statusCode,
  );

const makeSelectActionLoader = () =>
  createSelector(
    selectSite,
    siteState => siteState.actionLoading,
  );

export {
  selectSite,
  makeSelectLoader,
  makeSelectError,
  makeSelectSites,
  makeSelectSite,
  makeSelectResult,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
  makeSelectActionLoader,
};
