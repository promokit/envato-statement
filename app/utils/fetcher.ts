import { Sale, StatementResponse } from '../model/types';
import { fetchData } from '../services/envato';
import { getPeriodsDates } from './time';

export const fetchPeriods = async (): Promise<Sale[]> => {
    const periods = getPeriodsDates();
    const statements: StatementResponse = await fetchData(periods.lasttwoweeks);

    return statements.results;
};
