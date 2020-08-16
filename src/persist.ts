import {RootState} from "./modules";
import {defaultState} from "./default-state";

const initialState:RootState = defaultState;

export function getInitialState(){
    const json = localStorage.getItem('appState');
    if(!json){
        return initialState;
    }
    return JSON.parse(json);
}

export function cacheState(state: Object) {
    localStorage.setItem('appState', JSON.stringify(state));
}