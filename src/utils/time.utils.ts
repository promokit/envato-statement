import { Periods } from '../enums';
import { AU_TIMEZONE, CURRENCY_LOCALE, LOCAL_LOCALE } from '../constants';
const ONEDAY = 86400;

export const getAUTime = function (returnTime: boolean = false): Date {
  const options: object = {
    timeZone: AU_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat([], options).format(new Date());
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

export const getWeekDay = function (): number {
  const day = getAUTime().getDay();
  return day === 0 ? 7 : day;
};

export const getNextMonday = function (): Date {
  const date = getAUTime();
  const dateCopy = new Date(date);
  dateCopy.setDate(dateCopy.getDate() + ((1 + 7 - dateCopy.getDay()) % 7 || 7));
  dateCopy.setHours(0);
  dateCopy.setMinutes(0);
  dateCopy.setSeconds(0);
  return dateCopy;
};

const getTomorrowDate = function (): Date {
  const date = getAUTime();
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() + 1);
  dateCopy.setHours(0);
  dateCopy.setMinutes(0);
  dateCopy.setSeconds(0);
  return dateCopy;
};

export const getDateOfLastMonday = function (): string {
  const date = getAUTime();
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return convertDateToString(dateCopy);
};

export const getDateOfMondayWeekAgo = function (): string {
  const date = getAUTime();
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - ((date.getDay() + 6) % 7) - 7);
  return convertDateToString(dateCopy);
};

export const getLastSunday = function (): string {
  const date = getAUTime();
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - ((date.getDay() + 6) % 7) - 1);
  return convertDateToString(dateCopy);
};

export const getYesterdayDate = function (): string {
  return convertDateToString(new Date(getAUTime().getTime() - ONEDAY));
};

export const getLocalTimeOfOrder = function (
  dateString: string | Date
): string {
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

export const getClockTime = function (): string {
  const AUTime: Date = getAUTime();
  // compile date string
  const date: string = new Intl.DateTimeFormat(CURRENCY_LOCALE, {
    weekday: 'long',
  }).format(AUTime);
  // compile time string
  const time: string = Array.from([
    AUTime.getHours(),
    AUTime.getMinutes(),
    AUTime.getSeconds(),
  ])
    .map((item) => item.toString().padStart(2, '0'))
    .join(':');

  return `${date}, ${time}`;
};

export const getShortMonthName = function (date: Date): string {
  return date.toLocaleString(CURRENCY_LOCALE, { month: 'short' });
};

export const convertDateStringToMiliseconds = function (
  dateString: string | Date
): number {
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

export const convertDateToString = function (
  date: Date,
  getTime: boolean = false
): string {
  const [year, month, day] = [
    date.getFullYear().toString(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ];

  const time = getTime ? ' 00:00:00' : '';

  return `${year}-${month}-${day}${time}`;
};

export const getExpirationDate = function (period: Periods): number {
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

export const getDayStringForGraph = function (date: string): string {
  return convertDateToString(new Date(convertDateStringToMiliseconds(date)));
};

export const getPeriodsDates = function (): object {
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
