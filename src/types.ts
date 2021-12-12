export type PeriodStatistics = {
  totalEarnings: number;
  salesNumber: number;
  salesList: object;
  salesStatistics: object;
  ordersPerDay: object;
  expireAt: number;
};

export type StatementsSet = {
  today: PeriodStatistics;
  yesterday: PeriodStatistics;
  currentweek: PeriodStatistics;
  previousweek: PeriodStatistics;
};

export type Period = {
  from_date: string;
  to_date: string;
};

export type PeriodsList = {
  today: Period;
  yesterday: Period;
  currentweek: Period;
  previousweek: Period;
};

export type monthResponse = {
  earnings: string;
  month: string; // | Date;
  sales: string;
};

export type Sale = {
  amount: number;
  date: string;
  detail: string;
  item_id: number;
  order_id: number;
  other_party_city: string;
  other_party_country: string;
};

export type statementResponse = {
  count: number;
  results: Sale[];
};
