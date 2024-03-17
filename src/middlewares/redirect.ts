import {PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import browserHistory from '../browser-history';
import { globalSlice } from '../slices/global';

type Reducer = ReturnType<typeof globalSlice.reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
