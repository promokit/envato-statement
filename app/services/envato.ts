import type { IStatementResponse } from 'envato';
import Envato from 'envato';
import { OrderTypes } from '../model/enums';
import type { Period } from '../model/types';

export const fetchData = async (periodOptions: Period): Promise<IStatementResponse | null> => {
    const client = new Envato.Client(process.env.TOKEN || '');
    const options = { ...periodOptions, type: OrderTypes.Sale };

    try {
        const statement = await client.private.getStatement(options);
        return statement;
    } catch (error) {
        console.error('--------------', error);
    }

    return null;
};
