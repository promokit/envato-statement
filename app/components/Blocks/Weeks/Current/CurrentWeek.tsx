import { useContext } from 'react';
import { Period } from '../..';
import { StatementsContext } from '../../../../context/context';
import { getWeekDay } from '../../../../utils';

export const CurrentWeek = () => {
    const { totals, summary } = useContext(StatementsContext);
    const days = getWeekDay();

    return (
        <Period title="Current Week" summary={summary.currentweek} totals={totals.currentweek} days={days} />
    );
};
