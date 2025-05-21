import { createSlice } from '@reduxjs/toolkit';
import { dailyActionsApi } from './dailyActions';
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
};

const initialState: InitialState = {
    filterAnimals: [],
    selectedAnimals: [],
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
    },
});

export default slice.reducer;

export const selectAnimals = (state: RootState) =>
    state.animalsDailyActions.filterAnimals;

export const selectSelectedAnimals = (state: RootState) =>
    state.animalsDailyActions.selectedAnimals;

export const { addSelectedAnimal, addSelectedAnimals, deleteSelectedAnimals } =
    slice.actions;
