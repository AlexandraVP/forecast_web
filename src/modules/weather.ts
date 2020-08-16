import {getInitialState} from "../persist";

const appKey = '330216f9e3042b8a57a7865c3de67865';

const weatherUrl = (cityId: number) => `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${appKey}`;

const initialState: {current: WeatherData|null}= getInitialState().weather;

const GET_WEATHER_RESULT = 'GET_WEATHER_RESULT';


type WeatherData = {
    id: number,
    name: string,
    main: {
        temp: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    wind:{
        speed:number
    },
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    weather: {
        icon: string,
        main: string
    }[]
};

type WeatherAction = {
    type: typeof GET_WEATHER_RESULT,
    payload: WeatherData
}

export const getWeather = (cityId: number) => (dispatch: Function) => {
    fetch(weatherUrl(cityId))
        .then(d => d.json())
        .then(({main, name, sys, weather, wind, timezone, id}) => {
            dispatch({
                type: GET_WEATHER_RESULT, payload: {
                    main, name, sys, weather, wind, timezone, id
                }
            });
        })
};


export default function weatherReducer(weather  = initialState, action: WeatherAction) {
    if(action.type === GET_WEATHER_RESULT){
        return { current: action.payload};
    }
    return weather;
}