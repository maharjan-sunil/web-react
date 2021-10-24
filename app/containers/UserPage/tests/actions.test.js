import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  USERS_RESPONSE_ACTION,
  USER_RESPONSE_ACTION,
  RESET_RESULT_ACTION,
  USER_PROFILE_ACTION,
} from 'containers/UserPage/Constants';
import {
  getUsersAction,
  filterUsersAction,
  getUserAction,
  insertUserAction,
  updateUserAction,
  deleteUserAction,
  restoreUserAction,
  permanentDeleteUserAction,
  usersResponseAction,
  userResponseAction,
  responseAction,
  responseDeleteAction,
  responseRestoreAction,
  resetResultAction,
  getUserProfileAction,
} from 'containers/UserPage/actions';

describe('Users Actions', () => {
  describe('getUsersAction', () => {
    it('should create an action to get default users', () => {
      const expectedResult = {
        type: DEFAULT_ACTION,
      };
      expect(getUsersAction()).toEqual(expectedResult);
    });
  });

  describe('filterUsersAction', () => {
    it('should create an action to filter users', () => {
      const filterParams = { name: 'test', email: 'test', mobile: '123' };
      const expectedResult = {
        type: FILTER_ACTION,
        filterParams,
      };
      expect(filterUsersAction(filterParams)).toEqual(expectedResult);
    });
  });

  describe('getUserAction', () => {
    it('should create an action to get user by id', () => {
      const id = 1;
      const expectedResult = {
        type: DETAIL_ACTION,
        id,
      };
      expect(getUserAction(id)).toEqual(expectedResult);
    });
  });

  describe('insertUserAction', () => {
    it('should create an action to insert user', () => {
      const user = {
        name: 'test',
        email: 'test@email.com',
        mobile: '123',
        gender: 1,
      };
      const expectedResult = {
        type: INSERT_ACTION,
        user,
      };
      expect(insertUserAction(user)).toEqual(expectedResult);
    });
  });

  describe('updateUserAction', () => {
    it('should create an action to update user', () => {
      const user = { name: 'test', email: 'teste', mobile: '123', gender: 1 };
      const expectedResult = {
        type: UPDATE_ACTION,
        user,
      };
      expect(updateUserAction(user)).toEqual(expectedResult);
    });
  });

  describe('deleteUserAction', () => {
    it('should create an action to delete user', () => {
      const id = 1;
      const expectedResult = {
        type: DELETE_ACTION,
        id,
      };
      expect(deleteUserAction(id)).toEqual(expectedResult);
    });
  });

  describe('restoreUserAction', () => {
    it('should create an action to restore user', () => {
      const id = 1;
      const expectedResult = {
        type: RESTORE_ACTION,
        id,
      };
      expect(restoreUserAction(id)).toEqual(expectedResult);
    });
  });

  describe('permanentDeleteUserAction', () => {
    it('should create an action to permanently delete user', () => {
      const id = 1;
      const expectedResult = {
        type: PERMANENT_DELETE_ACTION,
        id,
      };
      expect(permanentDeleteUserAction(id)).toEqual(expectedResult);
    });
  });

  describe('responseAction', () => {
    it('should create an action for response', () => {
      const request = 1;
      const response = 1;
      const expectedResult = {
        type: RESPONSE_ACTION,
        request,
        response,
      };
      expect(responseAction(request, response)).toEqual(expectedResult);
    });
  });

  describe('responseDeleteAction', () => {
    it('should create an action for delete action', () => {
      const request = 12;
      const response = 1;
      const expectedResult = {
        type: RESPONSE_DELETE_ACTION,
        request,
        response,
      };
      expect(responseDeleteAction(request, response)).toEqual(expectedResult);
    });
  });

  describe('responesRestoreAction', () => {
    it('should create an action for restore action', () => {
      const request = 12;
      const response = 1;
      const expectedResult = {
        type: RESPONSE_RESTORE_ACTION,
        request,
        response,
      };
      expect(responseRestoreAction(request, response)).toEqual(expectedResult);
    });
  });

  describe('usersResponseAction', () => {
    it('should create an action for users response', () => {
      const request = { name: 'test', email: 'test', mobile: '123' };
      const response = [
        { name: 'test user', email: 'test@email.com', mobile: '+9881230090' },
      ];
      const expectedResult = {
        type: USERS_RESPONSE_ACTION,
        request,
        response,
      };
      expect(usersResponseAction(request, response)).toEqual(expectedResult);
    });
  });

  describe('userResponseAction', () => {
    it('should create an action for user response', () => {
      const request = 1;
      const response = {
        name: 'test user',
        email: 'test@email.com',
        mobile: '+9881230090',
      };
      const expectedResult = {
        type: USER_RESPONSE_ACTION,
        request,
        response,
      };
      expect(userResponseAction(request, response)).toEqual(expectedResult);
    });
  });

  describe('resetResultAction', () => {
    it('should create an action for result reset', () => {
      const expectedResult = {
        type: RESET_RESULT_ACTION,
      };
      expect(resetResultAction()).toEqual(expectedResult);
    });
  });

  describe('getUserProfileAction', () => {
    it('should create an action to get current user profile', () => {
      const expectedResult = {
        type: USER_PROFILE_ACTION,
      };
      expect(getUserProfileAction()).toEqual(expectedResult);
    });
  });
});
