import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { api } from '../app-service/services/api';
import animalsDailyActions from '../app/daily-actions/service/animalsDailyActionsSlice';
import dailyActions from '../app/daily-actions/service/dailyActionsSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        animalsDailyActions,
        dailyActions,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
