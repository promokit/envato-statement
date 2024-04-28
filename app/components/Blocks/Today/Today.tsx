import { useContext } from 'react';
import { StatementsContext } from '../../../context/context';
import { getTotal } from '../../../utils';
import { BlockHeader, BlockSkeleton, Sales } from '../../atoms';

export const Today = () => {
    const {
        byPeriods: { today },
    } = useContext(StatementsContext);

    const total = getTotal(today);

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={total} quantity={today.length} title="Sunday" />
                <Sales period={today} />
            </>
        </BlockSkeleton>
    );
};
