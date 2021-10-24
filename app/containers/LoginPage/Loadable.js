import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const LoginContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});

export const ActivateContainer = loadable(() => import('./activate'), {
  fallback: <LoaderIndicator />,
});

export const ForgotPasswordContainer = loadable(
  () => import('./forgotPassword'),
  {
    fallback: <LoaderIndicator />,
  },
);
