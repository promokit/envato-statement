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
        <time className="text-xl">{date}</time>
        <div className="grow">
            <div className="flex items-end text-xl relative after:content-[' '] after:w-full after:h-0 after:border-b after:border-b-dashed after:border-b-black after:opacity-20 after:block after:absolute after:bottom-0 after:left-0">
                <div className="items-baseline grow font-bold">
                    <span>{detail}</span>
                </div>
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
