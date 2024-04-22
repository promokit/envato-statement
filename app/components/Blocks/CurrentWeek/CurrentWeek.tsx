import { useContext } from 'react';
import { BlockHeader, BlockSkeleton } from '..';
import { Average, SummaryBlock } from '../../../components/atoms';
import { StatementsContext } from '../../../context/context';

export const CurrentWeek = () => {
    const {
        summary: { currentweek },
    } = useContext(StatementsContext);
    // const summary = summarize(currentweek);

    // const total = formatPrice(getTotal(currentweek));
    const total = '$72';

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={total} num={5} title="Current Week" />
                <SummaryBlock weekData={currentweek} />
                <Average amount={12} />
            </>
        </BlockSkeleton>
    );
};
