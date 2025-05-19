import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app-service/store';
import { animalsApi } from './animals';
import { dataIndexTypesChanged, IChangedAnimal } from '../data/types/animal';

export interface IAnimalGroup {
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

type ActionAnimals = {
    payload: {
        id: string;
        value: string | null;
        dataIndex: dataIndexTypesChanged
    };
};

type ActionAnimalsMoreFields = {
    payload: {
        id: string;
        value: string | null;
        nameField: string
    };
};

const slice = createSlice({
    name: 'animals',
    initialState: initialState,
    reducers: {
        updateChangedAnimals: (state, action: ActionAnimals) => {
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
                        if (key === 'identificationFields') return true
                        return changedAnimal[key] == null;
                    }) && !changedAnimal.identificationFields.length
                ) {
                    state.changedAnimals = state.changedAnimals.filter(
                        (animal) => animal.id !== action.payload.id
                    );
                } else {
                    state.changedAnimals[index] = {
                        ...changedAnimal
                    };
                }
            } else {
                if (action.payload.value === null) return;
                state.changedAnimals.push({
                    ...{
                        id: action.payload.id,
                        tagNumber: null,
                        birthDate: null,
                        breed: null,
                        groupID: null,
                        status: null,
                        origin: null,
                        originLocation: null,
                        motherTagNumber: null,
                        fatherTagNumber: null,
                        identificationFields:[]
                    },
                    [action.payload.dataIndex]: action.payload.value,
                });
            }
        },
        updateChangedAnimalsMoreFields: (state, action: ActionAnimalsMoreFields) => {
            const index = state.changedAnimals.findIndex(
                (animal) => animal.id === action.payload.id
            );

            if (index !== -1){
                const indexField = state.changedAnimals[index].identificationFields.findIndex(
                    (field) => field.identificationFieldName === action.payload.nameField
                )

                if (indexField !== -1){
                    state.changedAnimals[index].identificationFields[indexField].identificationValue = action.payload.value
                }
                else{
                    state.changedAnimals[index].identificationFields.push({
                        identificationFieldName: action.payload.nameField,
                        identificationValue: action.payload.value
                    })
                }

                const changedAnimal = {
                    ...state.changedAnimals[index]
                };
                if (
                    Object.keys(changedAnimal).every((key) => {
                        if (key === 'id') return true;
                        if (key === 'identificationFields') return true
                        return changedAnimal[key] == null;
                    }) && changedAnimal.identificationFields.every((field)=> 
                        field.identificationValue === null
                    )
                ) {
                    state.changedAnimals = state.changedAnimals.filter(
                        (animal) => animal.id !== action.payload.id
                    );
                } else {
                    state.changedAnimals[index] = {
                        ...changedAnimal
                    };
                }
            }else {
                if (action.payload.value === null) return;
                state.changedAnimals.push({
                    id: action.payload.id,
                    tagNumber: null,
                    birthDate: null,
                    breed: null,
                    groupID: null,
                    status: null,
                    origin: null,
                    originLocation: null,
                    motherTagNumber: null,
                    fatherTagNumber: null,
                    identificationFields:[{
                        identificationFieldName: action.payload.nameField,
                        identificationValue: action.payload.value
                    }]
                });
            }

        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            animalsApi.endpoints.getAnimalsGroups.matchFulfilled,
            (state, action) => {
                state.animalGroups = [...action.payload];
            }
        );
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

export const { updateChangedAnimals, updateChangedAnimalsMoreFields } = slice.actions;
