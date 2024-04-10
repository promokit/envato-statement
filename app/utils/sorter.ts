import { Periods } from '../model/enums';
import { Sale, SortedBlocks } from '../model/types';
import { isCurrentWeek, isPreviousWeek, isToday, isYesterday } from './time';

export const sortByPeriods = (statements: Sale[]): SortedBlocks => {
    return {
        [Periods.Today]: statements.filter(({ date }) => isToday(date)),
        [Periods.Yesterday]: statements.filter(({ date }) => isYesterday(date)),
        [Periods.CurrentWeek]: statements.filter(({ date }) => isCurrentWeek(date)),
        [Periods.PreviousWeek]: statements.filter(({ date }) => isPreviousWeek(date)),
    };
};
