import { useContext } from 'react';
import { BlockHeader, BlockSkeleton } from '..';
import { StatementsContext } from '../../../context/context';
import { getTotal } from '../../../utils';
import { Sales } from '../../atoms';

export const Today = () => {
    const {
        byPeriods: { today },
    } = useContext(StatementsContext);

    const total = getTotal(today);

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={total} quantity={today.length} title="Today" />
                <Sales period={today} />
            </>
        </BlockSkeleton>
    );
};
