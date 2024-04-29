import { formatPrice } from '../../../utils';

type Props = {
    amount: number;
    quantity: number;
    title: string;
};

export const BlockHeader = ({ amount, quantity, title }: Props) => (
    <header className="flex flex-col font-bold gap-2">
        <h2 className="text-5xl font-tinos leading-snug">{title}</h2>
        <div className="text-2xl">
            <span>{formatPrice(amount)}</span>
            <small>/ {quantity} Sales</small>
        </div>
    </header>
);
