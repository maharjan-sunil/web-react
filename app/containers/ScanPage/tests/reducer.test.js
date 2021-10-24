import produce from 'immer';

import scanPageReducer from '../reducer';
import {
  getScansAction,
  scansResponseAction,
  // loadError,
  scanResponseAction,
  // loadInfoError,
  // responseAction,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('scanPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      scans: {},
      scan: {},
      response: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(scanPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('shoud handle on page load action', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
    });
    expect(scanPageReducer(state, getScansAction())).toEqual(expectedResult);
  });

  it('shoud handle scan list load success action', () => {
    const scan = {};
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.scan = scan;
    });
    expect(scanPageReducer(state, scansResponseAction(scan))).toEqual(
      expectedResult,
    );
  });

  // it('shoud handle scan list load error action', () => {
  //   let fixture;
  //   const expectedResult = produce(state, draft => {
  //     draft.loading = false;
  //     draft.error = fixture;
  //   });
  //   expect(scanPageReducer(state, loadError(fixture))).toEqual(expectedResult);
  // });

  // it('shoud handle scan info error action', () => {
  //   let fixture;
  //   const expectedResult = produce(state, draft => {
  //     draft.loading = false;
  //     draft.error = fixture;
  //   });
  //   expect(scanPageReducer(state, loadInfoError(fixture))).toEqual(
  //     expectedResult,
  //   );
  // });

  it('shoud handle scan info success action', () => {
    const scan = {};
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.scan = scan;
    });
    expect(scanPageReducer(state, scanResponseAction(scan))).toEqual(
      expectedResult,
    );
  });

  // it('shoud handle success action', () => {
  //   const fixture = {
  //     response: 1,
  //   };
  //   const expectedResult = produce(state, draft => {
  //     draft.loading = false;
  //     draft.response = fixture;
  //   });
  //   expect(scanPageReducer(state, success(fixture))).toEqual(expectedResult);
  // });

  // it('shoud handle error action', () => {
  //   let fixture;
  //   const expectedResult = produce(state, draft => {
  //     draft.loading = false;
  //     draft.error = fixture;
  //   });
  //   expect(scanPageReducer(state, error(fixture))).toEqual(expectedResult);
  // });
});
