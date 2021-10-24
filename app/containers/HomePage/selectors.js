import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.homePage || initialState;

const makeSelectGridLayouts = () =>
  createSelector(
    selectHome,
    homeState => homeState.gridLayouts,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectHome,
    homeState => homeState.statusCode,
  );

export { makeSelectGridLayouts, makeSelectStatusCode };
