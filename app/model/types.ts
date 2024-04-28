import { IStatementResponse } from 'envato';
import { PeriodRange, Periods } from './enums';

export type Results = IStatementResponse['results'];
export type Result = Results[0];

type SaleExtension = { quantity: number; time: string };

type AllowedProps =
    | 'amount'
    | 'date'
    | 'detail'
    | 'item_id'
    | 'order_id'
    | 'other_party_city'
    | 'other_party_country';

export type Sale = Pick<Result, AllowedProps> & SaleExtension;

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

export type Total = {
    quantity: number;
    amount: number;
};

export type Summary = {
    detail: string;
    quantity: number;
    amount: number;
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

export type SalesTotal = {
    [key in Periods]: Total;
};

export type LoaderResponse = {
    byPeriods: SortedSales;
    summary: SalesSummary;
    totals: SalesTotal;
};

export type SortedBlocks = Omit<SortedSales, Periods.LastTwoWeeks>;
