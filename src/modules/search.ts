import {City} from "./cities";

const initialState: City[] = [];

const searchUrl = (town: string) => `https://openweathermap.org/data/2.5/find?q=${town}&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=1597503587553`;

const SEARCH_RESULT = 'SEARCH_RESULT';
const CLEAR_SEARCH = 'CLEAR_SEARCH';


type SearchAction = {
    type: typeof SEARCH_RESULT,
    payload: City[]
}

type ClearAction = {
    type: typeof CLEAR_SEARCH
}

export function searchCity(cityName: string){
    return (dispatch: Function) => {
        fetch(searchUrl(cityName)).then( d => d.json())
            .then(result => {
                dispatch({
                    type: SEARCH_RESULT,
                    payload: result.list
                })
            })
    }
}

export function clearSearch(){
    return {type: CLEAR_SEARCH};
}

export default function searchReducer(list:City[]=initialState, action: SearchAction | ClearAction){
    if(action.type === SEARCH_RESULT){
        return action.payload;
    }
    if(action.type === CLEAR_SEARCH){
        return [];
    }
    return list;
}