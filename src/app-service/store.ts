import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { api } from '../app-service/services/api';
import animals from '../app/animal-accounting/services/animalsSlice';
import registerAnimal from '../app/register-animal/services/registration-animal-slice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        animals,
        registerAnimal,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
