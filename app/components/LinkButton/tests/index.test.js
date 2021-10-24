import React from 'react';
import { render } from 'react-testing-library';
import LinkButton from '../index';

describe('<LinkButton />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<LinkButton id={id} />);
    expect(container.querySelector('button').id).toEqual(id);
  });
});
