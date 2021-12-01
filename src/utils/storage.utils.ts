import { Periods } from '../enums';
import { PeriodStatistics } from '../types';

const storage = window.localStorage;

export const saveToStorage = function (
  period: Periods,
  statement: object
): void {
  if (period == Periods.Yesterday || Periods.PreviousWeek) {
    storage.setItem(period, JSON.stringify(statement));
  }
};

export const getPeriodFromStorage = function (
  period: Periods
): PeriodStatistics {
  return JSON.parse(storage.getItem(period));
};
