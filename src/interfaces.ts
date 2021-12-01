interface Statistics {
  totalEarnings: number;
  salesNumber: number;
}

export interface DayStatistics extends Statistics {
  salesList: [];
}

export interface WeekStatistics extends Statistics {
  averagePerDay: number;
  salesList: [];
}

export interface MonthStatistics extends Statistics {
  monthEstimation: number;
  averagePerDay: number;
}

export interface DayListItem {
  title: string;
  time: string;
  price: number;
  buyerName: string;
  buyerCountry: string;
}

export interface WeekListItem {
  title: string;
  salesNumber: number;
}

export interface Statement {
  count: number;
  pagination: object;
  results: object[];
}
