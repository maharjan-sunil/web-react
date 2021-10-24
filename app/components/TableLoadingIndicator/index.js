/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Tr } from '@bootstrap-styled/v4';
import Tdloading from './TdLoading';
import loaderImg from './ajax-loader.gif';

const LoaderIndicator = () => (
  <Tr>
    <Tdloading colSpan="100%">
      Loading <img src={loaderImg} />
    </Tdloading>
  </Tr>
);

export default LoaderIndicator;
