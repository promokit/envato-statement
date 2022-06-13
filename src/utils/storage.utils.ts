import { Periods } from '../model/enums';
import { PeriodStatistics } from '../model/interfaces';

const storage = window.localStorage;

export const saveToStorage = (period: Periods, statement: object): void => {
  if (period == Periods.Yesterday || Periods.PreviousWeek) {
    storage.setItem(period, JSON.stringify(statement));
  }
};

export const getPeriodFromStorage = (period: Periods): PeriodStatistics =>
  JSON.parse(storage.getItem(period));
