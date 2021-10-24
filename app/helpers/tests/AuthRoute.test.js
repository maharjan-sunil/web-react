/**
 * Testing AuthRoute
 */
import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import configureStore from '../../configureStore';

describe('<AuthRoute />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('should show login Page', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <HomePage />
        </IntlProvider>
      </Provider>,
    );
  });
});
