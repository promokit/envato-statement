import { saleObject } from '../model/defaults';
import { Sale, SalesSummary, SortedBlocks, Summary } from '../model/types';

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

export const summarize = (sales: SortedBlocks): SalesSummary => {
    return Object.entries(sales).reduce((acc: any, [period, data]) => {
        acc[period] = data.reduce((result: Summary[], curr: Sale) => {
            const existingDetail: Summary | undefined = result.find(
                (item: any) => item.detail === curr.detail
            );
            if (existingDetail) {
                existingDetail.quantity += curr.quantity;
            } else {
                result.push({ detail: curr.detail, quantity: curr.quantity });
            }
            // console.log('______');
            // console.log(result);
            // console.log('-------');
            return result;
        }, []);
        return acc;
    }, {});
};
