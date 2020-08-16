import {getInitialState} from "../persist";

const initialState:City[] = getInitialState().cities;

export type City = {
    id: number,
    name: string,
    main: {
        temp: number
    },
    sys: {
        country: string
    }
}

const ADD_CITY = 'ADD_CITY';
const REMOVE_CITY = 'REMOVE_CITY';


type AddCity = {
    type: typeof ADD_CITY,
    city: City
};

type RemoveCity = {
    type: typeof REMOVE_CITY,
    cityId: number
}

export function addCity(city: City){
    return {type: ADD_CITY, city};
}

export function removeCity(cityId: number) {
    return {type: REMOVE_CITY, cityId};
}

export default function citiesReducer(cities:City[]=initialState, action: AddCity | RemoveCity){
    if(action.type === ADD_CITY){
        return [
            ...cities,
            action.city
        ]
    }
    if(action.type === REMOVE_CITY){
        return cities.filter(city=>city.id !== action.cityId);
    }
    return cities;
}