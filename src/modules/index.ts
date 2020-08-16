import {combineReducers} from "redux";
import cities from "./cities";
import search from "./search";
import weather from './weather';

export const rootReducer = combineReducers({
    cities,
    search,
    weather
});

export type RootState = ReturnType<typeof rootReducer>;