import React, {useEffect, useState} from "react";
import style from "./location.module.css";
import Background from "../background/background";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../modules";
import {clearSearch, searchCity} from "../../modules/search";
import {addCity, City, removeCity} from "../../modules/cities";
import {getWeather} from "../../modules/weather";
import {getTemp} from "../../utils";

const connector = connect((state: RootState) => ({
    search: state.search,
    cities: state.cities,
    weather: state.weather
}), {searchCity, addCity, clearSearch, getWeather, removeCity});

type ReduxProps = ConnectedProps<typeof connector>

function Location({search, searchCity, cities, addCity, clearSearch, getWeather, removeCity, weather}: ReduxProps){
    const [inputValue, setInputValue] = useState('');

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if(inputValue.length > 2){
            searchCity(inputValue);
        }
    }, [inputValue]);

    const handleAddCity = (city: City) => {
        setInputValue('');
        clearSearch();
        addCity(city);
    };

    const handleRemove = (cityId: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.nativeEvent.stopPropagation();
        e.stopPropagation();
        removeCity(cityId);
    };

    return (
        <div className={style.appLocation}>
            <div>
                <Background time='day'/>
            </div>
            <div className={style.locationContainer}>
                <span className={style.locationText}>Location</span>
                <input className={style.locationInput} type="text"
                       placeholder="Enter some text" value={inputValue} onChange={handleOnChange}/>
                {search
                    .filter(city => cities.every(c => c.id !== city.id))
                    .map( (city) => (
                    <div className={style.countriesList} key={city.id} onClick={() => handleAddCity(city)}>
                        <div className={style.locationInputText}>{city.name}, {city.sys.country}</div>
                        <div className={style.countriesTemperature}>{getTemp(city.main.temp)} °C</div>
                    </div>
                ))}
                <div className={style.scrollable}>
                {search.length > 0 && <div className={style.divider}/>}
                {cities.map( (city) => (
                    <div className={weather.current?.id  === city.id ? style.countriesListActive:  style.countriesList} onClick={() => getWeather(city.id)} key={city.id}>
                        <div className={style.locationInputText}>{city.name}, {city.sys.country}</div>
                        <div className={style.countriesTemperature}>{getTemp(city.main.temp)} °C</div>
                        <div className={style.remove} onClickCapture={(e)=>handleRemove(city.id, e)}>
                            <sup>X</sup>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default connector(Location);