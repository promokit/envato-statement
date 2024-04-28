import { useContext } from 'react';
import { WeekSummary } from '..';
import { StatementsContext } from '../../../context/context';
import { getWeekDay } from '../../../utils';

export const CurrentWeek = () => {
    const { totals, summary } = useContext(StatementsContext);
    const days = getWeekDay();

    return (
        <WeekSummary
            title="Current Week"
            summary={summary.currentweek}
            totals={totals.currentweek}
            days={days}
        />
    );
};
