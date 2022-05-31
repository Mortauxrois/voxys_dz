const WALK_TIME_IN_MINUTES = 5;

export type TTime = {
    h: number,
    m: number,
}

export function getOutTime(time: TTime, schedule: TTime[], walkTimeInMinutes = WALK_TIME_IN_MINUTES): TTime {
    const timeAfterWalk = addMinutes(time, walkTimeInMinutes);

    const timeAfterWalkNumber = timeAfterWalk.h * 100 + timeAfterWalk.m;
    const timeNumbers =  schedule.map(el => el.h * 100 + el.m);
    let nearestBusTime = {h: 6, m: 0};
    
    for (let i = 1; i < timeNumbers.length; i++) {
        if (timeNumbers[i - 1] < timeAfterWalkNumber && timeAfterWalkNumber <= timeNumbers[i]) {
            nearestBusTime = schedule[i];
            break;
        }  
    }
    return subMinutes(nearestBusTime, walkTimeInMinutes);
}

export function timeToString(time: TTime) {
    return `${addZeroPads(time.h)}:${addZeroPads(time.m)}`;
}

export function stringToTime(str: string): TTime {
    const temp = str.split(':');
    return {h: parseInt(temp[0]), m: parseInt(temp[1])};
}

export function scheduleFactory() {
    const STEP_IN_MINUTES = 15;
    const WORK_MINUTES_IN_DAY = (24 - 6) * 60;
    let time = {h: 6, m: 0};
    const schedule = [];
    for (let i = 0; i < WORK_MINUTES_IN_DAY / STEP_IN_MINUTES; i++) {
        schedule.push({...time});
        time = addMinutes(time, STEP_IN_MINUTES);
    }
    return schedule;
}

function addZeroPads(num: number) {
    return ('0' + num).slice(-2);
}

function subMinutes(time: TTime, min: number) {
    const res = {...time};
    res.m = res.m - min;
    if (res.m < 0) {
        res.m = 60 + res.m;
        res.h = res.h - 1;
        if ( res.h < 0) res.h = 23;
    }
    return res;
}

function addMinutes(time: TTime, min: number) {
    const res = {...time};
    res.m = res.m + min;
    if (res.m >= 60) {
        res.m = res.m - 60;
        res.h = res.h + 1;
        if ( res.h >= 24) res.h = 0;
    }
    return res;
}