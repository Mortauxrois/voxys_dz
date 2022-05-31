import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getOutTime, TTime, timeToString, stringToTime } from '../timeCore/timeCore';
import './ScheduleChecker.scss';

export interface IScheduleCheckerProps {
    schedule: TTime[];
};

const ScheduleChecker: React.FC<IScheduleCheckerProps> = ({schedule}) => {

    const [inputVal, setInputVal] = useState('00:00');
    const [validTime, setValidTime] = useState('00:00');
    const [resultTime, setResultTime] = useState('');
    const [validationState, setValidationState] = useState({isError: false, errMessage: ''});

    useEffect(() => {
        const time = stringToTime(validTime);
        const result =  getOutTime(time, schedule);
        setResultTime(timeToString(result));
    }, [validTime]);

    function validateInput(val: string) {
        const isSatisfiesNumberOfDigits = /^\d{1,2}:\d{2}$/.test(val);
        if (!isSatisfiesNumberOfDigits) return {isError: true, errMessage: 'Введите время в формате ЧЧ:ММ'}
        else {
            const time = stringToTime(val); 
           if (time.h >= 24 || time.m >= 60) return {isError: true, errMessage: 'Часы - [0..23], минуты - [00..59]'}
        }
        return {isError: false, errMessage: ''};
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const currentVal = e.target.value;
        const validateResult = validateInput(currentVal);
        if (!validateResult.isError) {
            setValidTime(currentVal);
        }
        setValidationState(validateResult);
        setInputVal(currentVal);
    }

    const inputClasses = classNames([
        'inputWrapper__input',
        {'inputWrapper__input_invalid': validationState.isError},
    ]);

    return (
        <div className='wrapper'>
            <div className='inputWrapper'>
                <p className='inputWrapper__label'>Текущее время:</p>
                <input value={inputVal} onChange={onInputChange} className={inputClasses}></input>
                {validationState.isError && <p className='inputWrapper__errorMsg'>{validationState.errMessage}</p> }
            </div>
            <p className='wrapper__resultLabel'> Нужно выйти в:</p>
            <p className='wrapper__resultField'>{resultTime}</p>
        </div>
    )
}

export default ScheduleChecker;