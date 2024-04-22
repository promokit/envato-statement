import type { Summary } from '~/model';
import { SummaryItem } from '..';

type Props = { weekData: Summary[] };

export const SummaryBlock = ({ weekData }: Props) => (
    <div className="flex flex-col gap-5">
        {weekData.map(({ detail, quantity }) => (
            <SummaryItem quantity={quantity} detail={detail} />
        ))}
    </div>
);
