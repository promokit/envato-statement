import { SaleItem } from '..';
import { Sale } from '../../../model/types';

type Props = {
    period: Sale[];
};

export const Sales = ({ period }: Props) => {
    return (
        <div className="flex flex-col gap-3">
            {period.map(({ date, detail, amount, other_party_city, other_party_country, item_id }) => (
                <SaleItem
                    key={item_id}
                    date={date}
                    detail={detail}
                    amount={amount}
                    city={other_party_city}
                    country={other_party_country}
                />
            ))}
        </div>
    );
};
