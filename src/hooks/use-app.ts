import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/store';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useActionCreators = <Action extends ActionCreatorsMapObject>(action:Action) => {
  const dispatch = useAppDispatch();
  //eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => bindActionCreators(action, dispatch),[]);
};
