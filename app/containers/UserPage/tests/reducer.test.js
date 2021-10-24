/* eslint-disable no-param-reassign */
import produce from 'immer';

import { reducer, initialState } from 'containers/UserPage/reducer';
import {
  getUsersAction,
  filterUsersAction,
  getUserAction,
  insertUserAction,
  updateUserAction,
  deleteUserAction,
  restoreUserAction,
  permanentDeleteUserAction,
  responseAction,
  responseDeleteAction,
  responseRestoreAction,
  responsePermanentDeleteAction,
  usersResponseAction,
  userResponseAction,
  resetResultAction,
  getUserProfileAction,
} from 'containers/UserPage/actions';

describe('userPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: true,
      error: false,
      request: false,
      users: [],
      user: {},
      result: {},
      page: 0,
      perPage: 20,
      total: 0,
    };
  });

  describe('initialState', () => {
    it('should create an initial stat and return initial state', () => {
      const expectedResult = {
        loading: true,
        error: false,
        request: false,
        users: [],
        user: {},
        result: {},
        page: 0,
        perPage: 20,
        total: 0,
      };
      expect(initialState).toEqual(expectedResult);
    });
  });

  describe('produceDefaultAction', () => {
    it('should produce default action and set state', () => {
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.users = [];
      });
      expect(reducer(state, getUsersAction())).toEqual(expectedResult);
    });
  });

  describe('produceFilterAction', () => {
    it('should produce filter action and set state', () => {
      const filterParams = { name: 'test', email: 'test', mobile: '123' };
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.users = [];
      });
      expect(reducer(state, filterUsersAction(filterParams))).toEqual(
        expectedResult,
      );
    });
  });

  describe('produceDetailAction', () => {
    it('should produce detail action and set state', () => {
      const id = 1;
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.user = {};
      });
      expect(reducer(state, getUserAction(id))).toEqual(expectedResult);
    });
  });

  describe('produceInsertAction', () => {
    it('should produce insert action and set state', () => {
      const user = {
        name: 'test',
        email: 'test@email.com',
        mobile: '123',
        gender: 1,
      };
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
      });
      expect(reducer(state, insertUserAction(user))).toEqual(expectedResult);
    });
  });

  describe('produceUpdateAction', () => {
    it('should produce update action and set state', () => {
      const user = {
        name: 'test',
        email: 'test@email.com',
        mobile: '123',
        gender: 1,
      };
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
      });
      expect(reducer(state, updateUserAction(user))).toEqual(expectedResult);
    });
  });

  describe('produceDeleteAction', () => {
    it('should produce delete action and set state', () => {
      const id = 1;
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
      });
      expect(reducer(state, deleteUserAction(id))).toEqual(expectedResult);
    });
  });

  describe('produceRestoreAction', () => {
    it('should produce restore action and set state', () => {
      const id = 1;
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
      });
      expect(reducer(state, restoreUserAction(id))).toEqual(expectedResult);
    });
  });

  describe('producePermanentDeleteAction', () => {
    it('should produce permanent delete action and set state', () => {
      const id = 1;
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
      });
      expect(reducer(state, permanentDeleteUserAction(id))).toEqual(
        expectedResult,
      );
    });
  });

  describe('produceResponseDeleteAction', () => {
    it('should produce response delete action and set state', () => {
      const id = 1;
      const response = 1;
      state.users = [
        {
          id: 1,
          name: 'test user',
          email: 'test@email.com',
          dataStatus: 1,
          isActive: true,
        },
      ];
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.request = id;
        draft.result = response;
        draft.users = [
          {
            id: 1,
            name: 'test user',
            email: 'test@email.com',
            dataStatus: 3,
            isActive: false,
          },
        ];
      });
      expect(reducer(state, responseDeleteAction(id, response))).toEqual(
        expectedResult,
      );
    });
  });

  describe('produceResponseRestoreAction', () => {
    it('should produce response restore action and set state', () => {
      const id = 1;
      const response = 1;
      state.users = [
        {
          id: 1,
          name: 'test user',
          email: 'test@email.com',
          dataStatus: 3,
          isActive: false,
        },
      ];
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.request = id;
        draft.result = response;
        draft.users = [
          {
            id: 1,
            name: 'test user',
            email: 'test@email.com',
            dataStatus: 2,
            isActive: false,
          },
        ];
      });
      expect(reducer(state, responseRestoreAction(id, response))).toEqual(
        expectedResult,
      );
    });
  });

  describe('produceResponsePermenentDeleteAction', () => {
    it('should produce response permanent delete action and set state', () => {
      const id = 1;
      const response = 1;
      state.users = [
        {
          id: 1,
          name: 'test user 1',
          email: 'test1@email.com',
          dataStatus: 3,
          isActive: false,
        },
        {
          id: 2,
          name: 'test user 2',
          email: 'test2@email.com',
          dataStatus: 2,
          isActive: false,
        },
      ];
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.request = id;
        draft.result = response;
        draft.users = [
          {
            id: 2,
            name: 'test user 2',
            email: 'test2@email.com',
            dataStatus: 2,
            isActive: false,
          },
        ];
      });
      expect(
        reducer(state, responsePermanentDeleteAction(id, response)),
      ).toEqual(expectedResult);
    });
  });

  describe('produceResponseAction', () => {
    it('should produce response action and set state', () => {
      const request = 1;
      const response = 1;
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.request = request;
        draft.result = response;
        draft.users = [];
        draft.user = {};
      });
      expect(reducer(state, responseAction(request, response))).toEqual(
        expectedResult,
      );
    });
  });

  describe('produceUsersResponseAction', () => {
    it('should produce users response action and set state', () => {
      const filterParams = { name: 'test', email: 'test', mobile: '123' };
      const response = {
        page: 1,
        perPage: 20,
        total: 1,
        result: [
          {
            id: 1,
            name: 'test user',
            email: 'test@email.com',
            dataStatus: 2,
            isActive: true,
          },
        ],
      };
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.request = filterParams;
        draft.users = response.result;
        draft.page = response.page;
        draft.perPage = response.perPage;
        draft.total = response.total;
        draft.result = {};
      });
      expect(
        reducer(state, usersResponseAction(filterParams, response)),
      ).toEqual(expectedResult);
    });
  });

  describe('produceUserResponseAction', () => {
    it('should produce user response action and set state', () => {
      const id = 1;
      const response = {
        id: 1,
        name: 'test user',
        email: 'test@email.com',
        dataStatus: 2,
        isActive: true,
      };
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.request = id;
        draft.users = [];
        draft.user = response;
      });
      expect(reducer(state, userResponseAction(id, response))).toEqual(
        expectedResult,
      );
    });
  });

  describe('produceResetResultAction', () => {
    it('should produce reset user action and set state', () => {
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.result = 0;
      });
      expect(reducer(state, resetResultAction())).toEqual(expectedResult);
    });
  });

  describe('produceProfileAction', () => {
    it('should produce current user profile action and set state', () => {
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.user = {};
      });
      expect(reducer(state, getUserProfileAction())).toEqual(expectedResult);
    });
  });
});
