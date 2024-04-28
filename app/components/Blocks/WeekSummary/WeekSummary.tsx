import { Average, BlockHeader, BlockSkeleton, SummaryBlock } from '../../../components/atoms';
import { Summary, Total } from '../../../model';

type Props = {
    title: string;
    summary: Summary[];
    totals: Total;
    days: number;
};

export const WeekSummary = ({ title, summary, totals: { amount, quantity }, days }: Props) => (
    <BlockSkeleton>
        <>
            <BlockHeader amount={amount} quantity={quantity} title={title} />
            <SummaryBlock weekData={summary} />
            <Average amount={amount / days} />
        </>
    </BlockSkeleton>
);
