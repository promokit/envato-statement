import {
  CLOCK_CONTAINER,
  COUNTDOWN_CONTAINER,
  LASTUPDATE_CONTAINER,
  LOCAL_LOCALE,
  REFRESH_TIMEOUT,
  WEEKDAY_CONTAINER,
} from '../constants';
import { getClockTime, getClockWeekday } from '../utils/time.utils';

const ONESEC = 1000;

export const showTime = (): void => {
  renderClock();
  renderLocalTime();
};

const renderLocalTime = (): void => {
  document.getElementById(LASTUPDATE_CONTAINER).textContent =
    new Intl.DateTimeFormat(LOCAL_LOCALE, {
      timeStyle: 'short',
    }).format(new Date());
};

const renderClock = (): void => {
  // render to page
  document.getElementById(CLOCK_CONTAINER).textContent = getClockTime();
  document.getElementById(WEEKDAY_CONTAINER).textContent = getClockWeekday();

  // update every second
  setTimeout(renderClock, ONESEC);
};

const reloadTime = Date.now();

export const showCountdown = (): void => {
  const startStamp: number = reloadTime + REFRESH_TIMEOUT;
  const diff: number = Math.round((startStamp - Date.now()) / ONESEC);
  const m: number = Math.floor(diff / 60);
  const s: number = diff - m * 60;

  const untilUpdate = document.getElementById(
    COUNTDOWN_CONTAINER
  ) as HTMLDivElement;

  if (m < 0) {
    untilUpdate.textContent = 'Timer Stopped';
    return;
  }

  untilUpdate.textContent =
    m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');

  setTimeout(showCountdown, ONESEC);
};
