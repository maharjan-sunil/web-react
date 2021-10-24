// import React from 'react';
// import { render, prettyDOM } from 'react-testing-library';
// import { IntlProvider } from 'react-intl';
// import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router-dom';

// import { sitePage, mapDispatchToProps } from 'containers/SitePage/index';
// // import { loadSites } from 'containers/SitePage/actions';
// import configureStore from '../../../configureStore';

// describe('<sitePage />', () => {
//   let store;

//   const { container } = render(<sitePage />);
//   console.log(prettyDOM(container));

//   it('should fetch the repos on mount if a username exists', () => {
//     const submitSpy = jest.fn();
//     render(
//       <Provider store={store}>
//         <IntlProvider locale="en">
//           <sitePage
//             username="Not Empty"
//             onChangeUsername={() => {}}
//             onSubmitForm={submitSpy}
//           />
//         </IntlProvider>
//       </Provider>,
//     );
//     expect(submitSpy).toHaveBeenCalled();
//   });

//   beforeAll(() => {
//     store = configureStore({}, browserHistory);
//   });

//   it('should render and match the snapshot', () => {
//     const {
//       container: { firstChild },
//     } = render(
//       <Provider store={store}>
//         <IntlProvider locale="en">
//           <sitePage loading={false} error={false} repos={[]} />
//         </IntlProvider>
//       </Provider>,
//     );
//     expect(firstChild).toMatchSnapshot();
//   });

//   it('should fetch the repos on mount if a username exists', () => {
//     const submitSpy = jest.fn();
//     render(
//       <Provider store={store}>
//         <IntlProvider locale="en">
//           <sitePage
//             username="Not Empty"
//             onChangeUsername={() => {}}
//             onSubmitForm={submitSpy}
//           />
//         </IntlProvider>
//       </Provider>,
//     );
//     expect(submitSpy).toHaveBeenCalled();
//   });

//   it('should not call onSubmitForm if username is an empty string', () => {
//     const submitSpy = jest.fn();
//     render(
//       <Provider store={store}>
//         <IntlProvider locale="en">
//           <sitePage onChangeUsername={() => {}} onSubmitForm={submitSpy} />
//         </IntlProvider>
//       </Provider>,
//     );
//     expect(submitSpy).not.toHaveBeenCalled();
//   });

//   it('should not call onButtonClick if username is null', () => {
//     const submitSpy = jest.fn();
//     render(
//       <Provider store={store}>
//         <IntlProvider locale="en">
//           <sitePage
//             username=""
//             onChangeUsername={() => {}}
//             onSubmitForm={submitSpy}
//           />
//         </IntlProvider>
//       </Provider>,
//     );
//     expect(submitSpy).not.toHaveBeenCalled();
//   });

//   describe('mapDispatchToProps', () => {
//     describe('onButtonClick', () => {
//       it('should be injected', () => {
//         const dispatch = jest.fn();
//         const result = mapDispatchToProps(dispatch);
//         expect(result.onButtonClick).toBeDefined();
//       });

//       it('should dispatch loadSites when called', () => {
//         const dispatch = jest.fn();
//         const result = mapDispatchToProps(dispatch);
//         result.onButtonClick();
//         // expect(dispatch).toHaveBeenCalledWith(loadSites());
//       });

//       it('should preventDefault if called with event', () => {
//         const preventDefault = jest.fn();
//         const result = mapDispatchToProps(() => {});
//         const evt = { preventDefault };
//         result.onButtonClick(evt);
//         expect(preventDefault).toHaveBeenCalledWith();
//       });
//     });
//   });
// });
