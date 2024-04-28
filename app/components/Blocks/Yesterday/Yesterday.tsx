import { useContext } from 'react';
import { BlockHeader, BlockSkeleton } from '..';
import { StatementsContext } from '../../../context/context';
import { getTotal } from '../../../utils';
import { Sales } from '../../atoms';

export const Yesterday = () => {
    const {
        byPeriods: { yesterday },
    } = useContext(StatementsContext);

    const total = getTotal(yesterday);

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={total} quantity={yesterday.length} title="Yesterday" />
                <Sales period={yesterday} />
            </>
        </BlockSkeleton>
    );
};
