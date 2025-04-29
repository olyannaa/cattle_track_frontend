import { createSlice } from '@reduxjs/toolkit';
import {
    registrationAnimalApi,
    SelectResponseType,
} from './registration-animal';
import { RootState } from '../../../app-service/store';

interface InitialState {
    groups: SelectResponseType[];
    additionalFields: SelectResponseType[];
}

const initialState: InitialState = {
    groups: [],
    additionalFields: [],
};
const slice = createSlice({
    name: 'registerAnimal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            registrationAnimalApi.endpoints.getAnimalGroups.matchFulfilled,
            (state, action) => {
                state.groups = action.payload;
            }
        );
        builder.addMatcher(
            registrationAnimalApi.endpoints.getAnimalIdentifications
                .matchFulfilled,
            (state, action) => {
                state.additionalFields = action.payload;
            }
        );
    },
});

export default slice.reducer;
export const selectGroups = (state: RootState) => state.registerAnimal.groups;
export const selectAdditionalFields = (state: RootState) =>
    state.registerAnimal.additionalFields;
