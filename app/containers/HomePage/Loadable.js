import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const HomePageContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});
