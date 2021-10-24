import {
  getScansAction,
  filterScansAction,
  scansResponseAction,
  scanResponseAction,
  getScanDetailAction,
  resetScanAction,
  setScanAction,
  // responseAction,
} from '../actions';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  RESET_ACTION,
  SET_ACTION,
  SCANS_RESPONSE_ACTION,
  SCAN_RESPONSE_ACTION,
  // RESPONSE_ACTION,
} from '../Constants';

describe('ScanPage actions', () => {
  it('has a type of DEFAULT_ACTION', () => {
    const expected = {
      type: DEFAULT_ACTION,
    };
    expect(getScansAction()).toEqual(expected);
  });

  it('has a type of FILTER_ACTION', () => {
    const filterData = {};
    const expected = {
      type: FILTER_ACTION,
      filterData,
    };
    expect(filterScansAction(filterData)).toEqual(expected);
  });

  it('has a type of SCANS_RESPONSE_ACTION', () => {
    const response = {};
    const expected = {
      type: SCANS_RESPONSE_ACTION,
      response,
    };
    expect(scansResponseAction(response)).toEqual(expected);
  });

  // it('has a type of LOAD_ERROR_ACTION', () => {
  //   const response = {};
  //   const expected = {
  //     type: LOAD_ERROR_ACTION,
  //     response,
  //   };
  //   expect(loadError(response)).toEqual(expected);
  // });

  it('has a type of DETAIL_ACTION', () => {
    const scanId = 1;
    const expected = {
      type: DETAIL_ACTION,
      scanId,
    };
    expect(getScanDetailAction(scanId)).toEqual(expected);
  });

  it('has a type of SCAN_RESPONSE_ACTION', () => {
    const response = {};
    const expected = {
      type: SCAN_RESPONSE_ACTION,
      response,
    };
    expect(scanResponseAction(response)).toEqual(expected);
  });

  // it('has a type of LOAD_INFO_ERROR_ACTION', () => {
  //   const response = 'some exception occured';
  //   const expected = {
  //     type: LOAD_INFO_ERROR_ACTION,
  //     response,
  //   };
  //   expect(loadInfoError(response)).toEqual(expected);
  // });

  it('has a type of RESET_ACTION', () => {
    const scanId = 1;
    const expected = {
      type: RESET_ACTION,
      scanId,
    };
    expect(resetScanAction(scanId)).toEqual(expected);
  });

  it('has a type of SET_SCAN_ACTION', () => {
    const scanId = 1;
    const count = 1;
    const expected = {
      type: SET_ACTION,
      scanId,
      count,
    };
    expect(setScanAction(scanId, count)).toEqual(expected);
  });

  // it('has a type of RESPONSE_ACTION', () => {
  //   const response = 1;
  //   const expected = {
  //     type: RESPONSE_ACTION,
  //     response,
  //   };
  //   expect(responseAction(response)).toEqual(expected);
  // });

  // it('has a type of ERROR_ACTION', () => {
  //   const err = 'some exception occured';
  //   const expected = {
  //     type: ERROR_ACTION,
  //     err,
  //   };
  //   expect(error(err)).toEqual(expected);
  // });
});
