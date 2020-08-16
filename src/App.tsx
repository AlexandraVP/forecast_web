import React from 'react';
import style from './App.module.css';
import Location from "./components/location/location";
import Main from "./components/main/main";

function App() {
    return (
        <div>
            <div className={style.container}>
                <Main/>
                <Location/>
            </div>
        </div>

    );
}

export default App;
