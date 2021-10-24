/**
 * Testing the LoginPage
 */

// import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';

import { login } from '../actions';

import { mapDispatchToProps } from '../index';

// const renderer = new ShallowRenderer();

// describe('<LoginPage />', () => {
//   it('should render and match the snapshot', () => {
//     renderer.render(<LoginPage state={{}} />);
//     const renderedOutput = renderer.getRenderOutput();
//     expect(renderedOutput).toMatchSnapshot();
//   });

describe('<LoginPage />', () => {
  describe('mapDispatchToProps', () => {
    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch login when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const email = 'admin';
        const password = 'admin';
        result.onSubmitForm({ email, password });
        expect(dispatch).toHaveBeenCalledWith(login(email, password));
      });
    });
  });
});
