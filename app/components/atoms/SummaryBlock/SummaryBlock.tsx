import { SummaryItem } from '..';
import type { Summary } from '../../../model';

type Props = { weekData: Summary[] };

export const SummaryBlock = ({ weekData }: Props) => (
    <div className="flex flex-col gap-5">
        {weekData.map(({ detail, quantity }) => (
            <SummaryItem key={detail} quantity={quantity} detail={detail} />
        ))}
    </div>
);
