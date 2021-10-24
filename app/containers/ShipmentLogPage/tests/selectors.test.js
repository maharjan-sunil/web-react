import {
  makeSelectLoading,
  makeSelectError,
  makeSelectLogs,
  makeSelectShipmentLog,
  makeSelectShipmentLogShipment,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
  makeSelectResponse,
  makeSelectRequest,
} from '../selectors';

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = true;
    const mockedState = {
      loading,
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = false;
    const mockedState = {
      error,
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });

  describe('makeSelectLogs', () => {
    const shipmentLogs = makeSelectLogs();
    it('should select the error', () => {
      const state = [];
      const mockedState = {
        state,
      };
      expect(shipmentLogs(mockedState)).toEqual(state);
    });
  });

  describe('makeSelectShipmentLog', () => {
    const shipmentLogDetail = makeSelectShipmentLog();
    it('should select the error', () => {
      const state = {};
      const mockedState = {
        state,
      };
      expect(shipmentLogDetail(mockedState)).toEqual(state);
    });
  });
});
describe('makeSelectShipmentLogShipment', () => {
  const shipmentLogDetail = makeSelectShipmentLogShipment();
  it('should select the error', () => {
    const state = {};
    const mockedState = {
      state,
    };
    expect(shipmentLogDetail(mockedState)).toEqual(state);
  });
});
describe('makeSelectPerPage', () => {
  const Perpage = makeSelectPerPage();
  it('should select the PerPage', () => {
    const P = 20;
    const mockedState = P;

    expect(Perpage(mockedState)).toEqual(P);
  });
});

describe('makeSelectPage', () => {
  const page = makeSelectPage();
  it('should select the page', () => {
    const p = 0;
    const mockedState = p;

    expect(page(mockedState)).toEqual(p);
  });
});
describe('makeSelectTotal', () => {
  const Total = makeSelectTotal();
  it('should select the Total', () => {
    const T = 0;
    const mockedState = T;

    expect(Total(mockedState)).toEqual(T);
  });
});

describe('makeSelectStatusCode', () => {
  const code = makeSelectStatusCode();
  it('should select the error', () => {
    const c = 0;
    const mockedState = c;

    expect(code(mockedState)).toEqual(c);
  });
});
describe('makeSelectResponse', () => {
  const Response = makeSelectResponse();
  it('should select the error', () => {
    const state = {};
    const mockedState = {
      state,
    };
    expect(Response(mockedState)).toEqual(state);
  });
});
describe('makeSelectRequest', () => {
  const Request = makeSelectRequest();
  it('should select the error', () => {
    const state = {};
    const mockedState = {
      state,
    };
    expect(Request(mockedState)).toEqual(state);
  });
});
