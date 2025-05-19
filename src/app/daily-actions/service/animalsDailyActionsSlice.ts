import { createSlice } from '@reduxjs/toolkit';
import { dailyActionsApi, FiltersAnimalsType } from './dailyActions';
import { RootState } from '../../../app-service/store';

type AnimalDailyActions = {
    id: string;
    tagNumber: string;
    type: string;
    status: string;
    groupName: string;
    groupId: string;
};

type InitialState = {
    filterAnimals: AnimalDailyActions[];
    selectedAnimals: string[];
    filtersAnimals: FiltersAnimalsType;
};

const initialState: InitialState = {
    filterAnimals: [],
    selectedAnimals: [],
    filtersAnimals: {
        groupId: '',
        type: '',
        isActive: true,
        tagNumber: '',
        identificationFieldId: '',
        identificationFieldValue: '',
    },
};

const slice = createSlice({
    name: 'animalsDailyActions',
    initialState: initialState,
    reducers: {
        addSelectedAnimal: (state, action) => {
            state.selectedAnimals = [action.payload];
        },
        addSelectedAnimals: (state, action) => {
            const isAnimal = !!state.selectedAnimals.find(
                (animal) => animal === action.payload
            );
            if (!isAnimal) {
                state.selectedAnimals.push(action.payload);
            }
        },
        deleteSelectedAnimals: (state, action) => {
            state.selectedAnimals = state.selectedAnimals.filter(
                (animal) => animal !== action.payload
            );
        },
        changeFiltersAnimals: (state, action) => {
            state.filtersAnimals = {
                ...state.filtersAnimals,
                [action.payload.name]: action.payload.value,
            };
        },
        resetFiltersAnimals: (state) => {
            state.filtersAnimals = {
                ...initialState.filtersAnimals,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            dailyActionsApi.endpoints.getFilterAnimals.matchFulfilled,
            (state, action) => {
                state.filterAnimals = [...action.payload];
                if (action.payload.length === 1) {
                    state.selectedAnimals = [action.payload[0].id];
                } else {
                    state.selectedAnimals = [];
                }
            }
        );
        builder.addMatcher(
            dailyActionsApi.endpoints.createDailyActions.matchFulfilled,
            (state) => {
                state.filtersAnimals = { ...initialState.filtersAnimals };
            }
        );
    },
});

export default slice.reducer;

export const selectAnimals = (state: RootState) =>
    state.animalsDailyActions.filterAnimals;

export const selectSelectedAnimals = (state: RootState) =>
    state.animalsDailyActions.selectedAnimals;

export const selectFiltersAnimals = (state: RootState) =>
    state.animalsDailyActions.filtersAnimals;

export const {
    addSelectedAnimal,
    addSelectedAnimals,
    deleteSelectedAnimals,
    resetFiltersAnimals,
    changeFiltersAnimals,
} = slice.actions;
