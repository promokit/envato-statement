import { formatPrice } from '../../../utils';

type Props = {
    amount: number;
};

export const Average = ({ amount }: Props) => {
    return <div className="average">Average: {formatPrice(amount)}/day</div>;
};
