import type { IStatementResponse } from 'envato';
import { fetchData } from '../services/envato';
import { getPeriodsDates } from './time';

export const fetchPeriods = async (): Promise<IStatementResponse['results'] | null> => {
    const periods = getPeriodsDates();
    const statements = await fetchData(periods.lasttwomonths);

    return statements?.results || null;
};
