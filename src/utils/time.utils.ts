import { Periods } from '../model/enums';
import { PeriodsList } from '../model/interfaces';
import {
  AU_TIMEZONE,
  CURRENCY_LOCALE,
  LOCAL_LOCALE,
  SUITABLE_TIME_FORMAT,
  WEEKDAYS_NUM,
} from '../model/constants';

const ONEDAY = 86400;

export const getAUTime = (returnTime: boolean = false): Date => {
  const options = {
    timeZone: AU_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  } as object;
  const formattedDate = new Intl.DateTimeFormat(
    SUITABLE_TIME_FORMAT,
    options
  ).format(new Date());

  const [date, time] = formattedDate.split(' ');
  const [day, month, year] = date.split('/');
  const [hours, minutes, seconds] = time.split(':');

  let dateShort: [number, number, number] = [
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
  ];

  if (returnTime) {
    return new Date(
      ...dateShort,
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds)
    );
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
    dateCopy.getDate() +
      ((1 + WEEKDAYS_NUM - dateCopy.getDay()) % WEEKDAYS_NUM || WEEKDAYS_NUM)
  );
  dateCopy.setHours(0);
  dateCopy.setMinutes(0);
  dateCopy.setSeconds(0);
  return dateCopy;
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

export const getDateOfLastMonday = (): string => {
  const date = getAUTime();
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - ((date.getDay() + 6) % WEEKDAYS_NUM));
  return convertDateToString(dateCopy);
};

export const getDateOfMondayWeekAgo = (): string => {
  const date = getAUTime();
  const dateCopy = new Date(date);
  dateCopy.setDate(
    date.getDate() - ((date.getDay() + 6) % WEEKDAYS_NUM) - WEEKDAYS_NUM
  );
  return convertDateToString(dateCopy);
};

export const getLastSunday = (): string => {
  const date = getAUTime();
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - ((date.getDay() + 6) % WEEKDAYS_NUM) - 1);
  return convertDateToString(dateCopy);
};

export const getYesterdayDate = (): string => {
  return convertDateToString(new Date(getAUTime().getTime() - ONEDAY));
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
  return new Date(localOrderTimeinMilisec)
    .toLocaleTimeString(LOCAL_LOCALE)
    .slice(0, 5); // get first 5 characters from locale time string
};

export const getClockTime = (): string => {
  const AUTime = getAUTime(true);
  // compile time string
  const time = Array.from([
    AUTime.getHours(),
    AUTime.getMinutes(),
    AUTime.getSeconds(),
  ])
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

export const convertDateStringToMiliseconds = (
  dateString: string | Date
): number => {
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

export const convertDateToString = (
  date: Date,
  getTime: boolean = false
): string => {
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
  return convertDateToString(new Date(convertDateStringToMiliseconds(date)));
};

export const getPeriodsDates = (): PeriodsList => {
  return {
    [Periods.Today]: {
      from_date: convertDateToString(getAUTime()),
      to_date: convertDateToString(getAUTime()),
    },
    [Periods.Yesterday]: {
      from_date: getYesterdayDate(),
      to_date: getYesterdayDate(),
    },
    [Periods.CurrentWeek]: {
      from_date: getDateOfLastMonday(),
      to_date: convertDateToString(getAUTime()),
    },
    [Periods.PreviousWeek]: {
      from_date: getDateOfMondayWeekAgo(),
      to_date: getLastSunday(),
    },
  };
};
