/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory, MemoryRouter } from 'react-router-dom';

import { HomePage } from '../index';
import configureStore from '../../../configureStore';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en">
            <HomePage loading={false} error={false} repos={[]} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
