import { SaleItem } from '..';
import { Sale } from '../../../model/types';

type Props = {
    period: Sale[];
};

export const Sales = ({ period }: Props) => (
    <div className="flex flex-col gap-3">
        {period.map(({ time, detail, amount, other_party_city, other_party_country, item_id }) => (
            <SaleItem
                key={item_id}
                time={time}
                detail={detail}
                amount={amount}
                other_party_city={other_party_city}
                other_party_country={other_party_country}
            />
        ))}
    </div>
);
