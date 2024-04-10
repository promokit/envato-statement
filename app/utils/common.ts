import { Sale } from '../model/types';

export const getTotal = (statement: Sale[]): number => {
    return statement.reduce((acc, item) => acc + Number(item.amount), 0);
};
