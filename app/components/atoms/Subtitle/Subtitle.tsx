type Props = {
    amount: string;
    num: number;
};

export const Subtitle = ({ amount, num }: Props) => (
    <h3 className="subtitle">
        {amount}
        <small>/ {num} Sales</small>
    </h3>
);
