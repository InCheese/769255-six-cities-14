import { Middleware, PayloadAction } from '@reduxjs/toolkit';

import browserHistory from '../browser-history';
import { reducer } from '../store/reducers';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'cities/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };