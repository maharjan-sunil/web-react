import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const FileErrorLogPageContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});

export const FileErrorLogDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});
