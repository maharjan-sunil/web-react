import React from 'react';
import { render } from 'react-testing-library';

import { StyledNavbar } from '../StyledNavbar';

describe('<Navbar />', () => {
  it('should render an <Navbar> tag', () => {
    const { container } = render(<StyledNavbar />);
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('NAV');
  });

  it('should match snapshot ', () => {
    const { container } = render(<StyledNavbar />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
