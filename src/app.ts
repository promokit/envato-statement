// One order contains multiple Sales;
// Example: Order #155124744 contains Items sale + Support sale (optional: + Extended Support sale)
const Envato = require('envato');
const { TOKEN } = process.env;

import { OrderTypes, Periods, Toggler } from './enums';
import { CLIENT_PARAMS } from './constants';
import { convertItemTitle } from './vocabulary';
import {
  StatementsSet,
  Period,
  PeriodsList,
  PeriodStatistics,
  monthResponse,
  statementResponse,
} from './types';
import { saveToStorage, getPeriodFromStorage } from './utils/storage.utils';
import { applyEnvatoFee } from './utils/tax.utils';
import { isFullFee } from './utils/string.utils';
import { showTime, showCountdown } from './components/clock';
import {
  getAUTime,
  getPeriodsDates,
  getLocalTimeOfOrder,
  getExpirationDate,
  getDayStringForGraph,
} from './utils/time.utils';
import {
  renderDaysAndWeeks,
  renderMonths,
  renderError,
  toggleLoader,
  renderNewSales,
} from './view/view';

class EnvatoStatement {
  private client: any;

  private periods: PeriodsList;

  private statement: statementResponse;

  private salesByMonth: Array<monthResponse>;

  private statementsSet: StatementsSet;

  private periodStatistics: PeriodStatistics;

  constructor() {
    if (!TOKEN) {
      renderError('Token is not provided in the .env file');
      return;
    }
    this.setupEnvironment();
    this.setupComponents();
  }

  /**
   * Setup app variables
   */
  private async setupEnvironment() {
    this.client = new Envato.Client(CLIENT_PARAMS);

    this.periods = getPeriodsDates();

    this.periodStatistics = {
      totalEarnings: 0,
      salesNumber: 0,
      expireAt: 0,
      salesList: {},
      ordersPerDay: {},
      salesStatistics: {},
    };

    this.statementsSet = {
      [Periods.Today]: this.periodStatistics,
      [Periods.Yesterday]: this.periodStatistics,
      [Periods.CurrentWeek]: this.periodStatistics,
      [Periods.PreviousWeek]: this.periodStatistics,
    };
  }

  private async setupComponents() {
    toggleLoader(Toggler.Show);

    showTime();
    showCountdown();

    await this.getStatementData();
    this.renderPage();

    this.cacheFetchedData();

    toggleLoader(Toggler.Hide);
  }

  private cacheFetchedData(): void {
    // save fetched data of by periods to localStorage
    for (let period in this.periods) {
      saveToStorage(period as Periods, this.statementsSet[period]);
    }
  }

  private async getStatementData() {
    for (let period in this.periods) {
      // check is data available or not, if so, just continue the loop
      if (!this.checkDataAvailability(period as Periods)) {
        continue;
      }

      // fetch data from Envato
      await this.fetchData(this.periods[period]);

      // filter and process date
      this.processData(period as Periods);
    }
  }

  private renderPage(): void {
    renderNewSales(this.statementsSet[Periods.Today]);
    renderDaysAndWeeks(this.statementsSet);
    renderMonths(this.salesByMonth);
  }

  /**
   * Fetch data from Envato
   * @param periodOptions
   */
  private async fetchData(periodOptions: Period) {
    // compile options for request
    const options = { ...periodOptions, type: OrderTypes.Sale };

    try {
      this.statement = await this.client.private.getStatement(options);
      this.salesByMonth = await this.client.private.getMonthlySales();
    } catch (error) {
      renderError('Unable to fetch data from Envato API');
      console.error(error);
    }
  }

  /**
   * check is data available in localStorage
   * @param period
   * return TRUE if fetch data is necessary
   */
  private checkDataAvailability(period: Periods): boolean {
    // if not cached period, return TRUE to fetch data
    if (period !== Periods.Yesterday && period !== Periods.PreviousWeek) {
      return true;
    }

    const cachedStatement: PeriodStatistics = getPeriodFromStorage(period);
    // if no cached data, return TRUE to fetch
    if (!cachedStatement) {
      return true;
    }
    // check is saved data is expired. If so, return TRUE to fetch data
    if (getAUTime().getTime() >= cachedStatement.expireAt) {
      return true;
    }

    this.statementsSet[period] = cachedStatement;
    // return false because all necessary data is available
    return false;
  }

  /**
   * Prepare fetched data for rendering
   * @param period
   */
  private processData(period: Periods): void {
    // used to calculate orders number
    const orderIDList = new Set();
    // accumulatess date for an sale
    const salesList: object = {};
    // contain details of every sale
    const salesStatistics: object = {};
    // contains earnings per day to display in a graph
    const ordersPerDay: object = {};
    // earnings for a period
    let totalEarnings: number = 0;
    // temp variable keeps amount with applied fee
    let amountWithFee: number;
    if (this.statement.results.length > 0) {
      for (const {
        amount,
        date,
        detail,
        item_id,
        order_id,
        other_party_city,
        other_party_country,
      } of this.statement.results) {
        orderIDList.add(order_id);
        amountWithFee = applyEnvatoFee(amount, isFullFee(detail));
        totalEarnings += amountWithFee;

        // accumulate data
        salesList[order_id] = {
          amount: (salesList[order_id]?.amount || 0) + amountWithFee,
          quantity: (salesList[order_id]?.quantity || 0) + 1,
          date: getLocalTimeOfOrder(date),
          other_party_city,
          other_party_country,
          detail: convertItemTitle(
            item_id,
            detail,
            salesList[order_id]?.quantity || 0
          ),
        };

        // get date string. used in a graph
        const day: string = getDayStringForGraph(date);

        // accumulate earnings per day
        ordersPerDay[day] = (ordersPerDay[day] || 0) + amountWithFee;
      }

      // accumulate sales number for item
      for (const order of Object.values(salesList)) {
        salesStatistics[order.detail] =
          (salesStatistics[order.detail] || 0) + 1;
      }
    }

    this.statementsSet[period] = {
      totalEarnings,
      salesStatistics,
      salesList,
      ordersPerDay,
      salesNumber: orderIDList.size,
      expireAt: getExpirationDate(period),
    };
  }
}

new EnvatoStatement();
