import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const FileInformationPageContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});

export const FileInformationDetailContainer = loadable(
  () => import('./detail'),
  {
    fallback: <LoaderIndicator />,
  },
);
