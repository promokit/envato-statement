import { useContext } from 'react';
import { StatementsContext } from '../../../../context/context';
import { getDay, getTotal } from '../../../../utils';
import { BlockHeader, BlockSkeleton, Sales } from '../../../atoms';

export const Today = () => {
    const {
        byPeriods: { today },
    } = useContext(StatementsContext);

    const total = getTotal(today);
    const day = getDay();

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={total} quantity={today.length} title={day} />
                <Sales period={today} />
            </>
        </BlockSkeleton>
    );
};
