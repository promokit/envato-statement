import { useContext } from 'react';
import { BlockSkeleton } from '..';
import { StatementsContext } from '../../../context/context';
import { formatPrice, getTotal } from '../../../utils';
import { Sales } from '../../atoms';
import { BlockHeader } from '../BlockHeader/BlockHeader';

export const Today = () => {
    const { today } = useContext(StatementsContext);

    const total = formatPrice(getTotal(today));

    return (
        <BlockSkeleton>
            <>
                <BlockHeader amount={total} num={today.length} title="Today" />
                <Sales period={today} />
            </>
        </BlockSkeleton>
    );
};
