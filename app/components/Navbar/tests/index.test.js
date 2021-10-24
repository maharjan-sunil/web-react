import React from 'react';
import { render } from 'react-testing-library';

import ShallowRenderer from 'react-test-renderer/shallow';
import { Img } from '@bootstrap-styled/v4';
import Navbar from '../index';

const renderer = new ShallowRenderer();

describe('<Navbar />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<Navbar />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should have a class attribute', () => {
    const { container } = render(
      <Img src="http://example.com/test.jpg" alt="test" />,
    );
    expect(container.querySelector('img').hasAttribute('class')).toBe(true);
  });
});
