import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const InvoicesContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});

export const InvoiceDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});
