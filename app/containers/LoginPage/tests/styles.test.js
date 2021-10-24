import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { LoginBox, SubApp } from '../styles';

test('it applies default styles', () => {
  const tree = renderer.create(<LoginBox />).toJSON();
  expect(tree).toHaveStyleRule('border-radius', '8px');
});

test('it applies default styles', () => {
  const tree = renderer.create(<SubApp />).toJSON();
  expect(tree).toHaveStyleRule('border-radius', '30px');
});
