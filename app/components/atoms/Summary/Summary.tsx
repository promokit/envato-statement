type Props = {
    detail: string;
    quantity: number;
};

export const Summary = ({ detail, quantity }: Props) => (
    <div>
        <span>{detail}</span>
        <span>{quantity}</span>
    </div>
);
