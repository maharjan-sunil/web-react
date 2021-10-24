import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
import { makeServer } from 'mirage/server';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { getScansAction, filterScansAction } from '../actions';
import { mapDispatchToProps, ScanPage } from '../index';
import { getAllScan } from '../mockResponse/api';

// import configureStore from 'app/configureStore';

describe('<scanPage />', () => {
  let server;
  let store;
  beforeEach(() => {
    // store = configureStore({}, browserHistory);
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });

  //   it('show message if no data are available', async () => {
  //     const { getByText } = render(
  //       <BrowserRouter>
  //         <ScanPage />
  //       </BrowserRouter>,
  //     );
  //     expect(getByText('No Data available')).toBeDefined();
  //   });

  it.only('show list if data are available', async () => {
    server.create('scan', getAllScan);
    const { getAllByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <ScanPage />
          </BrowserRouter>
        </IntlProvider>
      </Provider>,
    );
    // console.log(prettyDOM(getAllByTestId));
    const list = getAllByTestId('scanList');
    expect(list.length).toBe(1);
  });

  describe('mapDispatchToProps', () => {
    describe('onLoad', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLoad).toBeDefined();
      });

      it('should dispatch load action when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onLoad();
        expect(dispatch).toHaveBeenCalledWith(getScansAction());
      });
    });

    describe('onFilter', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onFilter).toBeDefined();
      });

      it('should dispatch filter action when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onFilter();
        expect(dispatch).toHaveBeenCalledWith(filterScansAction());
      });
    });
  });
});
