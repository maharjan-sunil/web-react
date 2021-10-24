import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const SitesContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});
export const SiteDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});
export const SiteSaveContainer = loadable(() => import('./save'), {
  fallback: <LoaderIndicator />,
});
