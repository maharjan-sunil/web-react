import { takeLatest, put } from 'redux-saga/effects';
import scanReportListener, {
  scanPageSaga,
  // scanPageFilterSaga,
  scanPageDetailSaga,
  // scanPageResetSaga,
  // scanPageSetCountSaga,
} from '../saga';

import { DEFAULT_ACTION } from '../Constants';

import {
  scansResponseAction,
  // loadError,
  scanResponseAction,
  // loadInfoError,
  // responseAction,
  // error,
} from '../actions';
import {
  getAllScan,
  // getFilterscan,
  getScanDetail,
  // resetScan,
  // setScanCount,
} from '../mockResponse/api';

describe('scanPageSaga Saga', () => {
  let scanGenerator;
  beforeEach(() => {
    scanGenerator = scanPageSaga();
  });

  it('should call the load success action if the all response are received', () => {
    const mockResponse = getAllScan();
    const putDescriptor = scanGenerator.next(mockResponse).value;
    expect(putDescriptor).toEqual(put(scansResponseAction(mockResponse)));
  });

  // it('should call the load error action if the response errors while getAllAction called', () => {
  //   const response = new Error('Some error');
  //   const putDescriptor = scanGenerator.throw(response).value;
  //   expect(putDescriptor).toEqual(put(loadError(response)));
  // });
});

// describe('scanPageFilterSaga Saga', () => {
//   let scanFilterGenerator;
//   const action = { type: FILTER_ACTION, filterData: { awb: '92151510600' } };
//   beforeEach(() => {
//     scanFilterGenerator = scanPageFilterSaga(action.filterData.awb);
//   });

//   it('should call the load success action if the filter response success', () => {
//     const mockResponse = getFilterscan();
//     const putDescriptor = scanFilterGenerator.next(mockResponse).value;
//     expect(putDescriptor).toEqual(put(loadSuccess(mockResponse)));
//   });

//   it('should call the load error action if the filter response errors', () => {
//     const response = new Error('LOAD_ERROR_ACTION');
//     const putDescriptor = scanFilterGenerator.throw(response).value;
//     expect(putDescriptor).toEqual(put(loadError(response)));
//   });
// });

describe('scanPageDetailSaga Saga', () => {
  let scanPageDetailGenerator;
  const action = { scanId: 1 };
  beforeEach(() => {
    scanPageDetailGenerator = scanPageDetailSaga(action.scanId);
  });

  it('should call the load info success action if the response success', () => {
    const mockResponse = getScanDetail();
    const putDescriptor = scanPageDetailGenerator.next(mockResponse).value;
    expect(putDescriptor).toEqual(put(scanResponseAction(mockResponse)));
  });

  // it('should call the load info error action if the response errors', () => {
  //   const response = new Error('Some error');
  //   const putDescriptor = scanPageDetailGenerator.throw(response).value;
  //   expect(putDescriptor).toEqual(put(loadInfoError(response)));
  // });
});

// describe('scanPageResetSaga Saga', () => {
//   let scanPageResetGenerator;
//   const action = { scanId: 1 };
//   beforeEach(() => {
//     scanPageResetGenerator = scanPageResetSaga(action.scanId, action.index);
//   });

// it('should call a success action if the response success', () => {
//   const apiResponse = 1;
//   const mockResponse = resetScan();
//   const putDescriptor = scanPageResetGenerator.next(apiResponse).value;
//   expect(putDescriptor).toEqual(put(responseAction(mockResponse)));
// });

// it('should call an error action if the response errors', () => {
//   const mockresponse = new Error('fail to reset');
//   const putDescriptor = scanPageResetGenerator.throw(mockresponse).value;
//   expect(putDescriptor).toEqual(put(error(mockresponse)));
// });
// });

// describe('scanPageSetCountSaga Saga', () => {
//   let scanPageSetCountSagaGenerator;
//   const action = { scanId: 1, setCount: 1 };
//   beforeEach(() => {
//     scanPageSetCountSagaGenerator = scanPageSetCountSaga(
//       action.scanId,
//       action.setCount,
//     );
//   });

// it('should call a success action if the response success', () => {
//   const apiResponse = 1;
//   const mockResponse = setScanCount();
//   const putDescriptor = scanPageSetCountSagaGenerator.next(apiResponse).value;
//   expect(putDescriptor).toEqual(put(responseAction(mockResponse)));
// });

// it('should call an error action if the response errors', () => {
//   const mockresponse = new Error('fail to reset');
//   const putDescriptor = scanPageSetCountSagaGenerator.throw(mockresponse)
//     .value;
//   expect(putDescriptor).toEqual(put(error(mockresponse)));
// });
// });

describe('scanReportListener Saga', () => {
  describe('on page load listerner', () => {
    const scanReportListenerSaga = scanReportListener();
    it('should start task to watch for ON_PAGE_LOAD_ACTION ', () => {
      const takeLatestDescriptor = scanReportListenerSaga.next().value;
      const expected = takeLatest(DEFAULT_ACTION, scanPageSaga);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
