import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/store';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useActionCreators = <Action extends ActionCreatorsMapObject>(actions:Action) => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch),[]);
};