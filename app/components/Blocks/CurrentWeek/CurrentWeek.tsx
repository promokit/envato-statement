import { useContext } from 'react';
import { BlockHeader, BlockSkeleton } from '..';
import { Summary } from '../../../components/atoms/Summary/Summary';
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
                <div>
                    {currentweek.map(({ detail, quantity }) => (
                        <Summary quantity={quantity} detail={detail} />
                    ))}
                </div>
                <div className="average">Average: $45.60/day</div>
            </>
        </BlockSkeleton>
    );
};
