import { useContext } from 'react';
import { WeekSummary } from '..';
import { StatementsContext } from '../../../context/context';

export const PreviousWeek = () => {
    const { totals, summary } = useContext(StatementsContext);

    return (
        <WeekSummary
            title="Previous Week"
            summary={summary.previousweek}
            totals={totals.previousweek}
            days={7}
        />
    );
};
