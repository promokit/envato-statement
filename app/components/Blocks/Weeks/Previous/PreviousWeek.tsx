import { useContext } from 'react';
import { Period } from '../..';
import { StatementsContext } from '../../../../context/context';

export const PreviousWeek = () => {
    const { totals, summary } = useContext(StatementsContext);

    return (
        <Period title="Previous Week" summary={summary.previousweek} totals={totals.previousweek} days={7} />
    );
};
