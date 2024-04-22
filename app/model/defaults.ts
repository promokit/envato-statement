import { Periods } from './enums';
import { LoaderResponse, PeriodStatistics } from './types';

export const periodDefaults: PeriodStatistics = {
    expireAt: 0,
    salesNumber: 0,
    totalEarnings: 0,
    salesStatistics: [],
    ordersPerDay: [],
    salesList: [],
};

export const contextDefaults: LoaderResponse = {
    byPeriods: {
        [Periods.Today]: [],
        [Periods.Yesterday]: [],
        [Periods.LastTwoWeeks]: [],
        [Periods.CurrentWeek]: [],
        [Periods.PreviousWeek]: [],
    },
    summary: {
        [Periods.Today]: [],
        [Periods.Yesterday]: [],
        [Periods.LastTwoWeeks]: [],
        [Periods.CurrentWeek]: [],
        [Periods.PreviousWeek]: [],
    },
};

export const totalDefaults = {
    [Periods.Today]: { quantity: 0, amount: 0 },
    [Periods.Yesterday]: { quantity: 0, amount: 0 },
    [Periods.CurrentWeek]: { quantity: 0, amount: 0 },
    [Periods.PreviousWeek]: { quantity: 0, amount: 0 },
    [Periods.LastTwoWeeks]: { quantity: 0, amount: 0 },
};

export const saleObject: string[] = [
    'amount',
    'date',
    'detail',
    'item_id',
    'quantity',
    'order_id',
    'other_party_city',
    'other_party_country',
];
