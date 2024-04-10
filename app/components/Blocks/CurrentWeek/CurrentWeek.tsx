import { useContext } from 'react';
import { StatementsContext } from '../../../context/context';
import { formatPrice, getTotal } from '../../../utils';
import { BlockSkeleton } from '../BlockSkeleton/BlockSkeleton';

export const CurrentWeek2 = () => {
    return (
        <BlockSkeleton title="Current Week">
            <div>Current Week Content</div>
        </BlockSkeleton>
    );
};

export const CurrentWeek = () => {
    const { currentweek } = useContext(StatementsContext);

    const total = formatPrice(getTotal(currentweek));

    return (
        <BlockSkeleton title="Current Week">
            <div id="previous-week-sales">
                <h3 className="subtitle">
                    $319.20 <small>/ 6 Sales</small>
                </h3>
                <dl className="item-summary">
                    <dt>
                        <span>Alysum</span>
                    </dt>
                    <dd>
                        <span>5</span>
                    </dd>
                </dl>
                <div className="average">Average: $45.60/day</div>
            </div>
        </BlockSkeleton>
    );
};
