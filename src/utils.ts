
const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export function getDate(timezone: number, time?: number){
    const d = time ? new Date(time): new Date();
    d.setTime(d.getTime() + d.getTimezoneOffset()*60*1000 + timezone*1000);
    return d;
}

export function getTime(timezone: number, time: number){
    const d = getDate(timezone, time*1000);
    const timeString = d.toLocaleTimeString('EN');
    return timeString.slice(0, -6) +  timeString.slice(-3);
}

export function getFormattedDate(timezone: number){
    const d = getDate(timezone);
    const timeString = d.toLocaleTimeString('EN');
    const time = timeString.slice(0, -6) +  timeString.slice(-3);
    return `${weekDays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} | ${time}`;
}

export function getDayPart(sunrise: number, sunset: number){
    if(Date.now() > sunrise * 1000 && Date.now() < sunset*1000){
        return 'day';
    }
    return 'night';
}

export function getImg(iconName: string){
    return `http://openweathermap.org/img/w/${iconName}.png`;
}

export function timeDiff(time1: number, time2: number){
    const diff = Math.ceil((time1 - time2)/60);
    const minutes = diff%60;
    const hours = (diff - minutes) / 60;
    return `${hours}h ${minutes}m`;
}

export function getTemp(temp: number){
    return (temp - 273.15).toFixed();
}