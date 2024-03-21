import { configureStore } from '@reduxjs/toolkit';
import { commonApi } from './service/common.api';
import userReducer from './slice/user-slice';
import { combineReducers } from 'redux';
import loadingReducer from './slice/loading-slice';

export const store = configureStore({
    reducer: combineReducers({
        auth: userReducer,
        [commonApi.reducerPath]: commonApi.reducer,
        loading: loadingReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(commonApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;