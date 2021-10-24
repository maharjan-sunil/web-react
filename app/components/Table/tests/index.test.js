import React from 'react';
import { render } from 'react-testing-library';

import Table from '../index';

describe('<Table />', () => {
  it('should render an <Table> tag', () => {
    const { container } = render(<Table />);
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('TABLE');
  });

  it('should match snapshot ', () => {
    const { container } = render(<Table />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
