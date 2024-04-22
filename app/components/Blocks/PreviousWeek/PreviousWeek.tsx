import { useContext } from 'react';
import { BlockHeader, BlockSkeleton } from '..';
import { StatementsContext } from '../../../context/context';
import { SummaryBlock } from '../../atoms';

export const PreviousWeek = () => {
    const {
        summary: { previousweek },
    } = useContext(StatementsContext);

    // const total = formatPrice(getTotal(previousweek));

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={'$123.00'} num={5} title="Previous Week" />
                <SummaryBlock weekData={previousweek} />
                <div className="average">Average: $45.60/day</div>
            </>
        </BlockSkeleton>
    );
};
