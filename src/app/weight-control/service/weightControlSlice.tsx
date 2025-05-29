import { createSlice } from '@reduxjs/toolkit';
import { FiltersAnimalsType } from '../../../global-components/data/types/Filters';
import { RootState } from '../../../app-service/store';

type InitialState = {
    filters: FiltersAnimalsType;
};

const initialState: InitialState = {
    filters: {
        groupId: '',
        type: '',
        isActive: true,
        tagNumber: '',
        identificationFieldId: '',
        identificationFieldValue: '',
    },
};

const slice = createSlice({
    name: 'weightControl',
    initialState: initialState,
    reducers: {
        changeFiltersWeightControl: (state, action) => {
            state.filters = {
                ...state.filters,
                [action.payload.name]: action.payload.value,
            };
        },
    },
});

export default slice.reducer;

export const { changeFiltersWeightControl } = slice.actions;

export const selectFiltersWeightControl = (state: RootState) =>
    state.weightControl.filters;
