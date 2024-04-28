import { Sale } from '~/model';
import { formatPrice } from '../../../utils';

type Props = Pick<Sale, 'time' | 'detail' | 'amount' | 'other_party_city' | 'other_party_country'>;

export const SaleItem = ({ time, detail, amount, other_party_city, other_party_country }: Props) => (
    <div className="flex gap-3">
        <time className="text-xl italic">{time}</time>
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
                {other_party_city}, {other_party_country}
            </div>
        </div>
    </div>
);
