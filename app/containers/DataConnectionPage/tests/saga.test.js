import { put, takeLatest } from 'redux-saga/effects';
import { Getdataconnection } from './api/data';
import mySaga, {
  GetdataconnectionPageSaga,
  pageDataConnectionsSaga,
} from '../saga';
import { DEFAULT_ACTION } from '../Constants';
import { dataconnectionsResponseAction } from '../actions';

describe('GetdataconnectionPageSaga SAGAS', () => {
  it('should dispatch action "DATACONNECTIONS_RESPONSE_ACTION" with result  from fetch  from  API', () => {
    const mockResponse = Getdataconnection();
    const action = {
      filterData: '&id=1&name=test',
    };
    let params = '';
    if (action.filterData) {
      params += `${action.filterData}`;
    }
    const generator = GetdataconnectionPageSaga(action);
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(
      put(dataconnectionsResponseAction(params, mockResponse)),
    );
    expect(generator.next().done).toBeTruthy();
  });
});
describe('pageDataConnectionsSaga SAGAS', () => {
  it('should dispatch a "DATACONNECTIONS_RESPONSE_ACTION" with result  from fetch  from  API', () => {
    const mockResponse = Getdataconnection();
    const action = {
      query: '&id=1&name=test',
    };
    let params = '';
    if (action.query) {
      params += `${action.query}`;
    }
    const generator = pageDataConnectionsSaga(action);
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(
      put(dataconnectionsResponseAction(params, mockResponse)),
    );
    expect(generator.next().done).toBeTruthy();
  });
});
describe('mySaga Saga', () => {
  const githubSaga = mySaga();
  it('should start task to watch for GetdataconnectionPageSaga action', () => {
    const takeLatestDescriptor = githubSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(DEFAULT_ACTION, GetdataconnectionPageSaga),
    );
  });
});
