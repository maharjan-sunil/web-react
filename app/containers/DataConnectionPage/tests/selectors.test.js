import {
  makeSelectLoading,
  makeSelectError,
  makeSelectdataconnections,
  makeSelectshipmentInfo,
  makeSelectdataconnection,
} from '../selectors';

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
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

  describe('makeSelectdataconnections', () => {
    const dataconnection = makeSelectdataconnections();
    it('should select the error', () => {
      const states = [];
      const mockedState = {
        states,
      };
      expect(dataconnection(mockedState)).toEqual(states);
    });
  });

  describe('makeSelectshipmentInfo', () => {
    const shipment = makeSelectshipmentInfo();
    it('should select the error', () => {
      const state = {};
      const mockedState = {
        state,
      };
      expect(shipment(mockedState)).toEqual(state);
    });
  });
  describe('makeSelectdataconnection', () => {
    const dataconnection = makeSelectdataconnection();
    it('should select the data connection', () => {
      const state = {};
      const mockedState = {
        state,
      };
      expect(dataconnection(mockedState)).toEqual(state);
    });
  });
});
