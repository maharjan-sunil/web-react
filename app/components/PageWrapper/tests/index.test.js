import React from 'react';
import { render } from 'react-testing-library';

import PageWrapper from '../index';

describe('<PageWrapper />', () => {
  it('should render an <PageWrapper> tag', () => {
    const { container } = render(<PageWrapper />);
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });

  it('should match snapshot ', () => {
    const { container } = render(<PageWrapper />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
