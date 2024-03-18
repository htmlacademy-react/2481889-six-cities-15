import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../browser-history';
import { rootReducer } from '../store/root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<PayloadAction, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
