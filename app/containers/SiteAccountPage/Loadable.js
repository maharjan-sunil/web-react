import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const SiteAccountsContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});

export const SiteAccountDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});

export const SiteAccountSaveContainer = loadable(() => import('./save'), {
  fallback: <LoaderIndicator />,
});
