import { Periods } from './enums';
import { LoaderResponse, PeriodStatistics, Sale } from './types';

export const periodDefaults: PeriodStatistics = {
    expireAt: 0,
    salesNumber: 0,
    totalEarnings: 0,
    salesStatistics: [],
    ordersPerDay: [],
    salesList: [],
};

export const totalDefaults = {
    [Periods.Today]: { quantity: 0, amount: 0 },
    [Periods.Yesterday]: { quantity: 0, amount: 0 },
    [Periods.CurrentWeek]: { quantity: 0, amount: 0 },
    [Periods.PreviousWeek]: { quantity: 0, amount: 0 },
    [Periods.CurrentMonth]: { quantity: 0, amount: 0 },
    [Periods.PreviousMonth]: { quantity: 0, amount: 0 },
    [Periods.LastTwoMonths]: { quantity: 0, amount: 0 },
};

const statementsList = {
    [Periods.Today]: [],
    [Periods.Yesterday]: [],
    [Periods.LastTwoMonths]: [],
    [Periods.CurrentWeek]: [],
    [Periods.PreviousWeek]: [],
    [Periods.CurrentMonth]: [],
    [Periods.PreviousMonth]: [],
};

export const contextDefaults: LoaderResponse = {
    byPeriods: { ...statementsList },
    summary: { ...statementsList },
    totals: { ...totalDefaults },
};

export const saleObject: (keyof Sale)[] = [
    'amount',
    'date',
    'detail',
    'item_id',
    'quantity',
    'order_id',
    'other_party_city',
    'other_party_country',
];
