import { useContext } from 'react';
import { BlockHeader, BlockSkeleton } from '..';
import { StatementsContext } from '../../../context/context';
import { formatPrice, getTotal } from '../../../utils';
import { Sales } from '../../atoms';

export const Yesterday = () => {
    const { yesterday } = useContext(StatementsContext);

    const total = formatPrice(getTotal(yesterday));

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={total} num={yesterday.length} title="Yesterday" />
                <Sales period={yesterday} />
            </>
        </BlockSkeleton>
    );
};
