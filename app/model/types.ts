import { PeriodRange, Periods } from './enums';

export type Sale = {
    amount: number;
    date: string;
    detail: string;
    item_id: number;
    quantity: number;
    order_id: number;
    other_party_city: string;
    other_party_country: string;
};

export type StatementResponse = {
    count: number;
    results: Sale[];
};

export type PeriodStatistics = {
    totalEarnings: number;
    salesNumber: number;
    salesList: Sale[];
    salesStatistics: number[];
    ordersPerDay: number[];
    expireAt: number;
};

export type Summary = {
    detail: string;
    quantity: number;
};

export type Period = {
    [PeriodRange.From]: string;
    [PeriodRange.To]: string;
};

export type Statements = {
    [key in Periods]: PeriodStatistics;
};

export type PeriodsList = {
    [key in Periods]: Period;
};

export type SortedSales = {
    [key in Periods]: Sale[];
};

export type SalesSummary = {
    [key in Periods]: Summary[];
};

export type LoaderResponse = {
    byPeriods: SortedSales;
    summary: SalesSummary;
};

export type SortedBlocks = Omit<SortedSales, Periods.LastTwoWeeks>;
