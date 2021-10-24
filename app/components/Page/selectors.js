import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.page || initialState;

const makeSelectResponse = () =>
  createSelector(
    selectHome,
    homeState => homeState,
  );

// const makeSelectStatusCode = () =>
//   createSelector(
//     selectHome,
//     homeState => homeState.statusCode,
//   );

export {
  selectHome,
  makeSelectResponse,
  //   makeSelectStatusCode,
};
