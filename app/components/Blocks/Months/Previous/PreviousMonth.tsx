import { useContext } from 'react';
import { Period } from '../..';
import { StatementsContext } from '../../../../context/context';
import { getWeekDay } from '../../../../utils';

export const PreviousMonth = () => {
    const { totals } = useContext(StatementsContext);
    const days = getWeekDay();

    return <Period title="Previous Month" summary={[]} totals={totals.previousmonth} days={days} />;
};
