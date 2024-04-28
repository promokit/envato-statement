import { shiftTimeToLocal } from '.';
import { SortedBlocks, convertItemTitle } from '../model';

export const beautifyData = (data: SortedBlocks): SortedBlocks => {
    const readyData = { ...data };

    for (const [period, sales] of Object.entries(data)) {
        Object.assign(readyData, {
            [period]: sales.map((sale) => ({
                ...sale,
                detail: convertItemTitle(sale.item_id, sale.detail, sale.quantity),
                time: shiftTimeToLocal(sale.date.toISOString().substring(11, 16)),
            })),
        });
    }

    return readyData;
};
