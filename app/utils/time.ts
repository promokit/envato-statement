import {
    AU_TIMEZONE,
    CURRENCY_LOCALE,
    LOCAL_LOCALE,
    SUITABLE_TIME_FORMAT,
    WEEKDAYS_NUM,
} from '../model/constants';
import { PeriodRange, Periods } from '../model/enums';
import { PeriodsList } from '../model/types';

const ONEDAY = 86400000;

export const getAUTime = (withTime: boolean = true): Date => {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: AU_TIMEZONE,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat(SUITABLE_TIME_FORMAT, options).format(new Date());

    const [date, time] = formattedDate.split(' ');
    const [day, month, year] = date.split('/');
    const [hours, minutes, seconds] = time.split(':');

    const dateShort: [number, number, number] = [parseInt(year), parseInt(month) - 1, parseInt(day)];

    if (withTime) {
        return new Date(...dateShort, parseInt(hours), parseInt(minutes), parseInt(seconds));
    }

    return new Date(...dateShort);
};

export const getWeekDay = (): number => {
    const day = getAUTime().getDay();
    return day === 0 ? WEEKDAYS_NUM : day;
};

export const getNextMonday = (): Date => {
    const date = getAUTime();
    const dateCopy = new Date(date);
    dateCopy.setDate(
        dateCopy.getDate() + ((1 + WEEKDAYS_NUM - dateCopy.getDay()) % WEEKDAYS_NUM || WEEKDAYS_NUM)
    );
    dateCopy.setHours(0);
    dateCopy.setMinutes(0);
    dateCopy.setSeconds(0);
    return dateCopy;
};

export const extractShortDate = (date: string): string => {
    const dateCopy = new Date(date);
    const shortDate = dateCopy.toISOString().split('T')[0];
    return shortDate;
};

export const getTodayShortDate = (): string => {
    const date = getAUTime();
    const dateCopy = new Date(date);
    return dateCopy.toISOString().split('T')[0];
};

export const getYesterdayDate = (): string => {
    const date = getAUTime();
    const dateCopy = new Date(date);
    const time = dateCopy.getTime();
    return convertDateToString(new Date(time - ONEDAY));
};

const getTomorrowDate = (): Date => {
    const date = getAUTime();
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + 1);
    dateCopy.setHours(0);
    dateCopy.setMinutes(0);
    dateCopy.setSeconds(0);
    return dateCopy;
};

export const getDateOfLastMonday = () => {
    const date = getAUTime();
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() - ((date.getDay() + 6) % WEEKDAYS_NUM));
    return dateCopy;
};

export const getDateOfLastMondayString = () => convertDateToString(getDateOfLastMonday());

export const getDateOfMondayWeekAgo = (): string => {
    const date = getAUTime();
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() - ((date.getDay() + 6) % WEEKDAYS_NUM) - WEEKDAYS_NUM);
    return convertDateToString(dateCopy);
};

export const getLastSunday = (): string => {
    const date = getAUTime();
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() - ((date.getDay() + 6) % WEEKDAYS_NUM) - 1);
    return convertDateToString(dateCopy);
};

export const getLocalTimeOfOrder = (dateString: string | Date): string => {
    // parse date string
    if (typeof dateString === 'object') {
        // get first 5 characters from locale time string
        return dateString.toLocaleTimeString(LOCAL_LOCALE).slice(0, 5);
    }
    const [date, time, offset] = dateString.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    // local time offset (Poland +1 hour) in Miliseconds
    const localTimeOffset = new Date().getTimezoneOffset() * 60 * 1000;
    // Australian time zone (+11 Hours) in Miliseconds
    const AUTimeOffset = (parseInt(offset) / 100) * 60 * 60 * 1000;
    // get difference between time zones in Miliseconds (10 hours in summer time)
    const timeDifference = AUTimeOffset + localTimeOffset;
    // Australian order time in miliseconds
    const AUOrderTime = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
    ).getTime();

    // get local time of order in miliseconds
    const localOrderTimeinMilisec = AUOrderTime - timeDifference;
    // return string of local order time
    return new Date(localOrderTimeinMilisec).toLocaleTimeString(LOCAL_LOCALE).slice(0, 5); // get first 5 characters from locale time string
};

export const getClockTime = (): string => {
    const AUTime = getAUTime(true);
    // compile time string
    const time = Array.from([AUTime.getHours(), AUTime.getMinutes(), AUTime.getSeconds()])
        .map((item) => item.toString().padStart(2, '0'))
        .join(':');
    return time;
};

export const getClockWeekday = (): string => {
    const AUTime: Date = getAUTime(true);
    // compile date string
    const date = new Intl.DateTimeFormat(CURRENCY_LOCALE, {
        weekday: 'long',
    }).format(AUTime);

    return date;
};

export const getShortMonthName = (date: Date): string => {
    return date.toLocaleString(CURRENCY_LOCALE, { month: 'short' });
};

export const convertDateStringToMiliseconds = (dateString: string | Date): number => {
    if (typeof dateString === 'object') {
        return dateString.getTime();
    }
    const [year, month, day] = dateString.split('-');
    const date = getAUTime();
    const dateCopy = new Date(date);

    dateCopy.setFullYear(parseInt(year));
    dateCopy.setMonth(parseInt(month) - 1);
    dateCopy.setDate(parseInt(day));
    dateCopy.setHours(0);
    dateCopy.setMinutes(0);
    dateCopy.setSeconds(0);

    return dateCopy.getTime();
};

export const convertDateToString = (date: Date, getTime: boolean = false): string => {
    const [year, month, day] = [
        date.getFullYear().toString(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getDate().toString().padStart(2, '0'),
    ];

    const time = getTime ? ' 00:00:00' : '';

    return `${year}-${month}-${day}${time}`;
};

export const getExpirationDate = (period: Periods): number => {
    switch (period) {
        case Periods.Today:
            return 0;
        case Periods.Yesterday:
            return getTomorrowDate().getTime();
        case Periods.CurrentWeek:
            return 0;
        case Periods.PreviousWeek:
            return getNextMonday().getTime();
        default:
            return 0;
    }
};

export const getDayStringForGraph = (date: string): string => {
    const newDate = new Date(convertDateStringToMiliseconds(date));
    return convertDateToString(newDate);
};

export const getPeriodsDates = (): PeriodsList => ({
    [Periods.Today]: {
        [PeriodRange.From]: convertDateToString(getAUTime()),
        [PeriodRange.To]: convertDateToString(getAUTime()),
    },
    [Periods.Yesterday]: {
        [PeriodRange.From]: getYesterdayDate(),
        [PeriodRange.To]: getYesterdayDate(),
    },
    [Periods.CurrentWeek]: {
        [PeriodRange.From]: getDateOfLastMondayString(),
        [PeriodRange.To]: convertDateToString(getAUTime()),
    },
    [Periods.PreviousWeek]: {
        [PeriodRange.From]: getDateOfMondayWeekAgo(),
        [PeriodRange.To]: getLastSunday(),
    },
    [Periods.LastTwoWeeks]: {
        [PeriodRange.From]: getDateOfMondayWeekAgo(),
        [PeriodRange.To]: convertDateToString(getAUTime()),
    },
});

export const isToday = (date: string): boolean => {
    return extractShortDate(date) === getTodayShortDate();
};

export const isYesterday = (date: string): boolean => {
    return extractShortDate(date) === getYesterdayDate();
};
export const isCurrentWeek = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    const dateToday = getAUTime();

    const currentWeekStart = getAUTime();
    currentWeekStart.setDate(dateToday.getDate() - dateToday.getDay());

    return date >= currentWeekStart && date <= dateToday;
};
export const isPreviousWeek = (dateStr: string): boolean => {
    const date = new Date(dateStr);

    const lastMonday = getDateOfLastMonday();

    const previousWeekStart = new Date(lastMonday);
    previousWeekStart.setDate(lastMonday.getDate() - 6);
    const previousWeekEnd = new Date(lastMonday);

    return date >= previousWeekStart && date <= previousWeekEnd;
};
