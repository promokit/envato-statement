import { Sale, SalesSummary, SalesTotal, SortedBlocks, Summary, saleObject, totalDefaults } from '../model';

// reduce sales number combining orders with the same id
export const combiner = (statements: Sale[]): Sale[] => {
    const combinedSales = statements.reduce((acc: Sale[], currentSale) => {
        const existingSale: Sale | undefined = acc.find(
            (sale: Sale) => sale.order_id === currentSale.order_id
        );
        if (existingSale) {
            existingSale.amount += currentSale.amount;
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
        return Object.entries(item).reduce((acc: any, [key, value]) => {
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

// summarize sales by name in period
export const summarize = (sales: SortedBlocks): SalesSummary => {
    const summary: SalesSummary = Object.entries(sales).reduce((acc: any, [period, data]) => {
        acc[period] = data.reduce((result: Summary[], curr: Sale) => {
            const existingDetail: Summary | undefined = result.find(
                (item: Summary) => item.detail === curr.detail
            );
            if (existingDetail) {
                existingDetail.quantity += curr.quantity;
                existingDetail.amount += curr.amount;
            } else {
                result.push({ detail: curr.detail, quantity: curr.quantity, amount: curr.amount });
            }
            return result;
        }, []);
        return acc;
    }, {});

    return summary;
};

export const calculateTotals = (sales: SalesSummary): SalesTotal => {
    const periods: SalesTotal = { ...totalDefaults };

    Object.entries(sales).forEach(([key, data]) => {
        periods[key] = data.reduce(
            (acc, cur) => {
                acc.quantity += cur.quantity;
                acc.amount += cur.amount;
                return acc;
            },
            { quantity: 0, amount: 0 }
        );
    });

    return periods;
};
