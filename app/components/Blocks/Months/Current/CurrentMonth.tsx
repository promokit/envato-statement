import { useContext } from 'react';
import { Period } from '../..';
import { StatementsContext } from '../../../../context/context';
import { getWeekDay } from '../../../../utils';

export const CurrentMonth = () => {
    const { totals } = useContext(StatementsContext);
    const days = getWeekDay();

    return <Period title="Current Month" summary={[]} totals={totals.currentmonth} days={days} />;
};
