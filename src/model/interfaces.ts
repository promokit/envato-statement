export interface Sale {
  amount: number;
  date: string;
  detail: string;
  item_id?: number;
  quantity: number;
  order_id?: number;
  other_party_city: string;
  other_party_country: string;
}

export interface PeriodStatistics {
  totalEarnings: number;
  salesNumber: number;
  salesList: Sale[];
  salesStatistics: number[];
  ordersPerDay: number[];
  expireAt: number;
}

export interface StatementsSet {
  today: PeriodStatistics;
  yesterday: PeriodStatistics;
  currentweek: PeriodStatistics;
  previousweek: PeriodStatistics;
}

export interface Period {
  from_date: string;
  to_date: string;
}

export interface PeriodsList {
  today: Period;
  yesterday: Period;
  currentweek: Period;
  previousweek: Period;
}

export interface MonthResponse {
  earnings: string;
  month: string; // | Date;
  sales: string;
}

export interface StatementResponse {
  count: number;
  results: Sale[];
}

export interface ClientInterface {
  private: {
    getStatement: Function;
    getMonthlySales: Function;
  };
}
