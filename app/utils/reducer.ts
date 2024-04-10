import { saleObject } from '../model/defaults';
import { Sale } from '../model/types';

export const combiner = (statements: Sale[]): Sale[] => {
    const combinedSales = statements.reduce((acc: Sale[], currentSale) => {
        const existingSale: Sale | undefined = acc.find(
            (sale: Sale) => sale.order_id === currentSale.order_id
        );
        if (existingSale) {
            existingSale.amount += currentSale.amount;
            existingSale.quantity++;
        } else {
            acc.push({ ...currentSale, quantity: 1 });
        }
        return acc;
    }, []);

    return combinedSales;
};

// TODO: Fix any type
export const reducer = (statements: Sale[]): Sale[] => {
    const filtered = statements.map((item: Sale) => {
        const saleEntries = Object.entries(item);
        return saleEntries.reduce((acc: any, [key, value]) => {
            if (saleObject.includes(key)) {
                acc[key] = value;
            }
            return acc;
        }, {});
    });

    // combine sales with the same ID into one
    const combinedSales = combiner(filtered);

    return combinedSales;
};
