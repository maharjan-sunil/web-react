import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/Loader';

export const UsersContainer = loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});
export const UserDetailContainer = loadable(() => import('./detail'), {
  fallback: <LoaderIndicator />,
});
export const UserSaveContainer = loadable(() => import('./save'), {
  fallback: <LoaderIndicator />,
});
export const UserProfileContainer = loadable(() => import('./profile'), {
  fallback: <LoaderIndicator />,
});
