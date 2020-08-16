import React from "react";
import style from "./main.module.css";
import Background from "../background/background";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../modules";
import {getDayPart, getFormattedDate, getImg, getTemp, getTime, timeDiff} from "../../utils";

const connector = connect( (state: RootState) => ({
    current: state.weather.current
}));

type ReduxProps = ConnectedProps<typeof connector>


function Main({current}: ReduxProps) {
    if(!current){
        return (
            <div className={style.appDay}>
                <div>
                    <Background time='day'/>
                </div>
            </div>
        );
    }
    return (
        <div className={style.appDay}>
            <div>
                <Background time={getDayPart(current.sys.sunrise, current.sys.sunset)}/>
            </div>
            <div className={style.dayContainer}>

                <div className={style.header}>
                    <div className={style.headerData}>{getFormattedDate(current.timezone)}</div>
                    <div className={style.headerCountry}>
                        <div>{current.name} {current.sys.country}</div>
                    </div>
                </div>

                <div className={style.row + ' ' + style.first_row}>
                    <div className={style.cloudySunBlock}>
                        <div><img className={style.cloudySun} src={getImg(current.weather[0].icon)}/></div>
                        <div className={style.cloudySunText}>{current.weather[0].main}</div>
                    </div>
                    <div className={style.mainWeatherTemperature}>
                        {getTemp(current.main.temp)}<sup className={style.sup}>°C</sup>
                    </div>
                    <div>
                        <div className={style.mainWeatherTemperaturePeriod}>
                            <div className={style.temperatureDegree}>{getTemp(current.main.temp_max)}°C&nbsp;↑</div>
                            <div className={style.temperatureDegree}>{getTemp(current.main.temp_min)}°C&nbsp;↓</div>
                        </div>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.col}>
                        <div><img className={style.drop} src='/drop.svg'/></div>
                        <div className={style.rowValue}>{current.main.humidity}%</div>
                        <div className={style.rowTextValue}>Humidity </div>
                    </div>
                    <div className={style.col}>
                        <div><img className={style.drop} src='/Group.svg'/></div>
                        <div className={style.rowValue}>{(current.main.pressure/1000).toFixed(3)}mBar</div>
                        <div className={style.rowTextValue}>Pressure</div>
                    </div>
                    <div className={style.col}>
                        <div><img className={style.drop} src='/wind.svg'/></div>
                        <div className={style.rowValue}>{(current.wind.speed *3.6).toFixed()} km/h </div>
                        <div className={style.rowTextValue}>Wind</div>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.col}>
                        <div><img className={style.drop} src='/sunset.svg'/></div>
                        <div className={style.rowValue}>{getTime(current.timezone, current.sys.sunrise)}</div>
                        <div className={style.rowTextValue}>Sunrise</div>
                    </div>
                    <div className={style.col}>
                        <div><img className={style.drop} src='/sunrise.svg'/></div>
                        <div className={style.rowValue}>{getTime(current.timezone, current.sys.sunset)}</div>
                        <div className={style.rowTextValue}>Sunset</div>
                    </div>
                    <div className={style.col}>
                        <div><img className={style.drop} src='/clock.svg'/></div>
                        <div className={style.rowValue}>{timeDiff(current.sys.sunset, current.sys.sunrise)}</div>
                        <div className={style.rowTextValue}>Daytime</div>
                    </div>
                </div>




            </div>
        </div>
    )
}

export default connector(Main);