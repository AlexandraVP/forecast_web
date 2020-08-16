import React from "react";
import style from "./background.module.css";

export default function Background({time}: {time: 'day' | 'night'}){
    if(time === 'day'){
        return <img className={style.img} src='/day.png'/>
    }
    if(time === 'night'){
        return <img className={style.img} src='/night.png'/>
    }
    return null;
}