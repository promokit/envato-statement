import { isCurrentMonth, isCurrentWeek, isPreviousMonth, isPreviousWeek, isToday, isYesterday } from '.';
import { Periods } from '../model/enums';
import type { Sale, SortedBlocks } from '../model/types';

export const sortByPeriods = (statements: Sale[]): SortedBlocks => {
    return {
        [Periods.Today]: statements.filter(({ date }) => isToday(date)),
        [Periods.Yesterday]: statements.filter(({ date }) => isYesterday(date)),
        [Periods.CurrentWeek]: statements.filter(({ date }) => isCurrentWeek(date)),
        [Periods.PreviousWeek]: statements.filter(({ date }) => isPreviousWeek(date)),
        [Periods.CurrentMonth]: statements.filter(({ date }) => isCurrentMonth(date)),
        [Periods.PreviousMonth]: statements.filter(({ date }) => isPreviousMonth(date)),
    };
};
