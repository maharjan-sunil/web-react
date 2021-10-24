import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const FTPFilePageContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});

export const FTPFileDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});
