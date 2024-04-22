import type { IStatementResponse } from 'envato';
import { context } from '../context/context';
import { OrderTypes } from '../model/enums';
import type { Period } from '../model/types';

export const fetchData = async (periodOptions: Period): Promise<IStatementResponse | null> => {
    const options = { ...periodOptions, type: OrderTypes.Sale };

    try {
        const statement = await context.client.private.getStatement(options);
        return statement;
    } catch (error) {
        console.error('--------------', error);
    }

    return null;
};
