import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const DataConnectionsContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});
export const DataConnectionDetailContainer = loadable(
  () => import('./detail'),
  {
    fallback: <LoaderIndicator />,
  },
);
export const ShipmentDetailContainer = loadable(
  () => import('./shipmentDetail'),
  {
    fallback: <LoaderIndicator />,
  },
);
