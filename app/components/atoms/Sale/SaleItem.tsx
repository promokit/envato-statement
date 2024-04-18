import { formatPrice } from '../../../utils';

type Props = {
    date: string;
    detail: string;
    amount: number;
    city: string;
    country: string;
};

export const SaleItem = ({ date, detail, amount, city, country }: Props) => (
    <div className="flex gap-3">
        <time className="text-xl italic">{date}</time>
        <div className="grow">
            <div className="flex gap-2 items-baseline items-end text-xl relative  after:block after:absolute after:bottom-0 after:left-0">
                <div className="items-baseline font-bold">
                    <span>{detail}</span>
                </div>
                <div className="grow border-b border-dashed border-b-black opacity-20"></div>
                <div>
                    <strong>{formatPrice(amount)}</strong>
                </div>
            </div>
            <div className="italic capitalize">
                {city}, {country}
            </div>
        </div>
    </div>
);
