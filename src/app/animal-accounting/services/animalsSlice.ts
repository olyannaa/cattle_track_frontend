import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app-service/store';
import { animalsApi } from './animals';
import { IChangedAnimal } from '../data/types/animal';

interface IAnimalGroup {
    id: string;
    name: string;
}

type InitialState = {
    animalGroups: IAnimalGroup[];
    changedAnimals: IChangedAnimal[];
};

const initialState: InitialState = {
    animalGroups: [],
    changedAnimals: [],
};

type Action = {
    payload: {
        id: string;
        value: string | null;
        dataIndex: 'tagNumber' | 'groupID' | 'birthDate' | 'status';
    };
};

const slice = createSlice({
    name: 'animals',
    initialState: initialState,
    reducers: {
        updateChangedAnimals: (state, action: Action) => {
            const index = state.changedAnimals.findIndex(
                (animal) => animal.id === action.payload.id
            );

            if (index !== -1) {
                const changedAnimal = {
                    ...state.changedAnimals[index],
                    [action.payload.dataIndex]: action.payload.value,
                };
                if (
                    Object.keys(changedAnimal).every((key) => {
                        if (key === 'id') return true;
                        return changedAnimal[key] == null;
                    })
                ) {
                    state.changedAnimals = state.changedAnimals.filter(
                        (animal) => animal.id !== action.payload.id
                    );
                } else {
                    state.changedAnimals[index] = {
                        ...state.changedAnimals[index],
                        [action.payload.dataIndex]: action.payload.value,
                    };
                }
            } else {
                if (!action.payload.value) return;
                state.changedAnimals.push({
                    ...{
                        id: action.payload.id,
                        groupID: null,
                        tagNumber: null,
                        status: null,
                        birthDate: null,
                    },
                    [action.payload.dataIndex]: action.payload.value,
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            animalsApi.endpoints.getAnimalsGroups.matchFulfilled,
            (state, action) => {
                state.animalGroups = [...action.payload];
            }
        ),
            builder.addMatcher(
                animalsApi.endpoints.getAnimals.matchFulfilled,
                (state) => {
                    state.changedAnimals = [];
                }
            );
    },
});

export default slice.reducer;
export const selectAnimalGroups = (state: RootState) => state.animals.animalGroups;
export const selectChangedAnimals = (state: RootState) => state.animals.changedAnimals;

export const { updateChangedAnimals } = slice.actions;
