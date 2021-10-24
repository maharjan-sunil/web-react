import {
  selectScan,
  makeSelectLoading,
  makeSelectError,
  makeSelectScan,
  // makeSelectResponse,
} from '../selectors';

describe('ScanSelector', () => {
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
  describe('makeSelectLoading', () => {
    const loadingSelector = makeSelectLoading();
    it('should select the loading', () => {
      const loading = false;
      const mockedState = {
        scanPage: {
          loading,
        },
      };
      expect(loadingSelector(mockedState)).toEqual(loading);
    });
  });

  describe('makeSelectError', () => {
    const errorSelector = makeSelectError();
    it('should select the error', () => {
      const error = 404;
      const mockedState = {
        scanPage: {
          error,
        },
      };
      expect(errorSelector(mockedState)).toEqual(error);
    });
  });

  describe('selectScan', () => {
    it('should select the scan state', () => {
      expect(selectScan(state)).toEqual(state);
    });
  });

  describe('makeSelectScan', () => {
    const scanSelector = makeSelectScan();
    it('should select the scan info', () => {
      const scan = {};
      const mockedState = {
        scanPage: {
          scan,
        },
      };
      expect(scanSelector(mockedState)).toEqual(scan);
    });
  });

  // describe('makeSelectResponse', () => {
  //   const responseSelector = makeSelectResponse();
  //   it('should select the scan info', () => {
  //     const response = 1;
  //     const mockedState = {
  //       scanPage: {
  //         response,
  //       },
  //     };
  //     expect(responseSelector(mockedState)).toEqual(response);
  //   });
  // });
});
