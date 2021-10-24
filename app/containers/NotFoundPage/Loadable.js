import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export default loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});
