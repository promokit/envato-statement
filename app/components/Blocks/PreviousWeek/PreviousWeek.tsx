import { useContext } from 'react';
import { BlockHeader, BlockSkeleton } from '..';
import { Summary } from '../../../components/atoms/Summary/Summary';
import { StatementsContext } from '../../../context/context';

export const PreviousWeek = () => {
    const {
        summary: { previousweek },
    } = useContext(StatementsContext);

    // const total = formatPrice(getTotal(previousweek));

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={'$123.00'} num={5} title="Previous Week" />
                <div>
                    {previousweek.map(({ detail, quantity }) => (
                        <Summary quantity={quantity} detail={detail} />
                    ))}
                </div>
                <div className="average">Average: $45.60/day</div>
            </>
        </BlockSkeleton>
    );
};
