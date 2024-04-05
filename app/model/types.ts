import { Periods } from "./enums";

export type Sale = {
    amount: number;
    date: string;
    detail: string;
    item_id?: number;
    quantity: number;
    order_id?: number;
    other_party_city: string;
    other_party_country: string;
}

export type PeriodStatistics = {
    totalEarnings: number;
    salesNumber: number;
    salesList: Sale[];
    salesStatistics: number[];
    ordersPerDay: number[];
    expireAt: number;
}

export type Statements = {
    [Periods.Today]: PeriodStatistics;
    [Periods.Yesterday]: PeriodStatistics;
    [Periods.CurrentWeek]: PeriodStatistics;
    [Periods.PreviousWeek]: PeriodStatistics;
}

export type Period = {
    from_date: string;
    to_date: string;
}