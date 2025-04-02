import { api } from "./api";

type IRequestGetAnimals = {
    Id: string;
    Type: string;
}

export type IAnimal = {
    birthDate: null;   
    breed: string;
    fatherTagNumber: null;
    groupName: null
    id: "86dcfe48-bf2f-48ac-a110-4e2c2adf7149"
    motherTagNumber: null
    origin: "собственное"
    originLocation: null
    status: "Прочее"
    tagNumber: "12556139"
}

type IResponseGetAnimals = IAnimal[]

export const animalsApi = api.injectEndpoints({
    endpoints:(builder)=> ({
        getAnimals: builder.query<IResponseGetAnimals, IRequestGetAnimals>({
            query: (data)=>({
                url: `animals?Id=${data.Id}&Type=${data.Type}`,
                method: 'GET',
            })
        })
    })
})

export const {useLazyGetAnimalsQuery} = animalsApi