/**
 * Asynchronously loads the component for LogPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const EmailsContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});

export const EmailDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});
