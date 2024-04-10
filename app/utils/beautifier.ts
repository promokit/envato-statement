import { SortedBlocks } from '../model/types';
import { convertItemTitle } from '../model/vocabulary';

export const beautifyData = (data: SortedBlocks): SortedBlocks => {
    const readyData = { ...data };

    for (const [period, sales] of Object.entries(data)) {
        Object.assign(readyData, {
            [period]: sales.map((sale) => ({
                ...sale,
                detail: convertItemTitle(sale.item_id, sale.detail, sale.quantity),
                date: sale.date.substring(11, 16),
            })),
        });
    }

    return readyData;
};
