import { runSaga } from 'redux-saga';

// import { getUsersAction } from 'containers/UserPage/actions';
import userSaga from 'containers/UserPage/saga';

describe('getUsersSaga', () => {
  it('should load users and handle them in case of success', async () => {
    const dispatchedActions = [];
    const fakeStore = {
      getState: () => [
        {
          id: 1,
          name: 'test 1',
          email: 'test1@email.com',
          mobile: '123',
          gender: 1,
        },
        {
          id: 2,
          name: 'test 2',
          email: 'test2@email.com',
          mobile: '123',
          gender: 1,
        },
      ],
      dispatch: action => dispatchedActions.push(action),
    };
    await runSaga(fakeStore, userSaga).done;
  });
});
