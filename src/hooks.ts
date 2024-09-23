import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './Store';

export const UseAppDispatch = () => useDispatch<AppDispatch> ()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 