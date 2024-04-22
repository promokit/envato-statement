type Props = {
    detail: string;
    quantity: number;
};

export const SummaryItem = ({ detail, quantity }: Props) => (
    <div className="flex gap-2 items-baseline items-end text-xl relative  after:block after:absolute after:bottom-0 after:left-0">
        <div className="items-baseline font-bold">
            <span>{detail}</span>
        </div>
        <div className="grow border-b border-dashed border-b-black opacity-20"></div>
        <div>
            <strong>{quantity}</strong>
        </div>
    </div>
);
