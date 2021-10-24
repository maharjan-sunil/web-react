/**
 * Asynchronously loads the component for LogPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const ScansContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});
export const ScanDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});
