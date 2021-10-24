import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const ShipmentLogPagesContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});

export const ShipmentLogDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});

export const ShipmentLogShipmentContainer = loadable(
  () => import('./shipmentDetail'),
  {
    fallback: <LoaderIndicator />,
  },
);
