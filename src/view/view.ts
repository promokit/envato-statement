import { Periods, Toggler } from '../model/enums';
import { formatPrice } from '../utils/string.utils';
import { notify } from '../utils/notification.utils';
import { getPeriodFromStorage } from '../utils/storage.utils';
import { renderMonthGraph, renderDaysGraph } from '../components/charts';
import {
  Sale,
  PeriodStatistics,
  StatementsSet,
  MonthResponse,
} from '../model/interfaces';
import {
  renderHeading,
  renderStatistics,
  renderSalesList,
  renderAverage,
  renderEstimate,
} from './templates';
import {
  DATA_CONTAINER,
  ERROR_CONTAINER,
  HIDDEN_CLASS,
  TODAY_CONTAINER,
  YESTERDAY_CONTAINER,
  CURRENT_WEEK_CONTAINER,
  PREVIOUS_WEEK_CONTAINER,
  NEW_SALES_CONTAINER,
  CURRENT_MONTH,
  PREVIOUS_MONTH,
  LOADER_CLASS,
  GRAPH_MONTHS,
  WEEKDAYS_NUM,
} from '../model/constants';
import {
  getWeekDay,
  getAUTime,
  convertDateStringToMiliseconds,
  convertDateToString,
  getDateOfMondayWeekAgo,
} from '../utils/time.utils';

const render = (elementId: string, markup: string): void => {
  document.getElementById(elementId).innerHTML = markup;
};

const renderBlock = (period: string, data: PeriodStatistics): void => {
  const { totalEarnings, salesNumber, salesList, salesStatistics } = data;

  let markup = '';

  if (period === Periods.Today || period === Periods.Yesterday) {
    markup += renderHeading(totalEarnings, salesNumber);

    const salesListEntries: Array<Sale> = Object.values(salesList).reverse();

    for (const saleSet of salesListEntries) {
      markup += renderSalesList(saleSet);
    }
  }

  if (period === Periods.CurrentWeek || period === Periods.PreviousWeek) {
    markup += renderHeading(totalEarnings, salesNumber);

    Object.entries(salesStatistics).forEach(
      (entry) => (markup += renderStatistics(entry))
    );

    const average =
      totalEarnings /
      (period === Periods.CurrentWeek ? getWeekDay() : WEEKDAYS_NUM);

    markup += renderAverage(average);

    if (period === Periods.CurrentWeek) {
      const currentDay = getAUTime().getDay();
      const estimate = getEstimation(
        totalEarnings,
        currentDay ? currentDay : WEEKDAYS_NUM,
        WEEKDAYS_NUM
      );
      markup += renderEstimate(estimate);
    }
  }

  switch (period) {
    case Periods.Today:
      render(TODAY_CONTAINER, markup);
      break;
    case Periods.Yesterday:
      render(YESTERDAY_CONTAINER, markup);
      break;
    case Periods.CurrentWeek:
      render(CURRENT_WEEK_CONTAINER, markup);
      break;
    case Periods.PreviousWeek:
      render(PREVIOUS_WEEK_CONTAINER, markup);
      break;
    default:
      break;
  }
};

export const renderDaysAndWeeks = (dataSet: StatementsSet): void => {
  Object.keys(dataSet).forEach((period) => {
    renderBlock(period, dataSet[period]);
  });

  const twoWeeksData = Object.assign(
    dataSet[Periods.CurrentWeek].ordersPerDay,
    dataSet[Periods.PreviousWeek].ordersPerDay
  );

  let datesList = getDatesList(
    getDateOfMondayWeekAgo(),
    convertDateToString(getAUTime())
  );

  Object.entries(datesList).forEach(([date, _]) => {
    datesList[date] = twoWeeksData[date] ? twoWeeksData[date] : 0;
  });

  renderDaysGraph(datesList);
};

const getPreviousMonthMarkup = ({ month, sales, earnings }): string => {
  let markup = '';
  // get heading markup
  markup += renderHeading(earnings, sales);
  // get content markup
  markup += renderAverage(earnings / month.getDate());

  return markup;
};

const getEstimation = (
  earnings: number,
  periodDay: number,
  periodDaysNumber: number
): number => (earnings / periodDay) * periodDaysNumber;

const getCurrentMonthMarkup = ({ month, sales, earnings }): string => {
  const day = getAUTime().getDate();
  const estimate = getEstimation(
    earnings,
    getAUTime().getDate(),
    month.getDate()
  );
  const average = earnings / day;

  let markup = '';
  // get heading markup
  markup += renderHeading(earnings, sales);
  // get content markup
  markup += renderAverage(average);
  markup += renderEstimate(estimate);

  return markup;
};

export const renderMonths = (months: Array<MonthResponse>): void => {
  // render last 2 months in details
  const [previous, current] = months.slice(-2);

  render(CURRENT_MONTH, getCurrentMonthMarkup(current));
  render(PREVIOUS_MONTH, getPreviousMonthMarkup(previous));

  // render sales by months chart of last 15 months
  renderMonthGraph(months.slice(-GRAPH_MONTHS));
};

export const notifyAboutNewSales = (newSales: Sale[]): null => {
  // return if no new sales
  if (newSales.length === 0) {
    return null;
  }

  let markup = '';
  let sale = 'Sale';
  let salesPrice = 0;
  let salesNumber = 0;
  let notificationBody = '';
  let notificationTitle = '';

  newSales.forEach((details) => {
    salesNumber++;
    salesPrice = salesPrice + Number(details.amount);
    notificationBody += `${details.detail}, `;
    markup += renderSalesList(details);
  });

  salesNumber > 1 && (sale += 's');

  notificationTitle = `${salesNumber} ${sale}, ${formatPrice(salesPrice)}`;
  notificationBody = notificationBody.slice(0, -2).replace(/(<([^>]+)>)/gi, '');

  // display browser's notification
  notify(notificationTitle, notificationBody);

  // render list of new sales to the page
  render(NEW_SALES_CONTAINER, markup);

  // make "new sales" block visible
  document
    .getElementById(NEW_SALES_CONTAINER)
    .parentElement.classList.remove(HIDDEN_CLASS);

  return null;
};

export const getDatesList = (
  startString: string,
  endString: string
): object => {
  const start = convertDateStringToMiliseconds(startString);
  const end = convertDateStringToMiliseconds(endString);
  const endDate = new Date(end);
  const datesList = {};
  let loop = new Date(start);

  while (loop < endDate) {
    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    datesList[convertDateToString(loop)] = 0;
  }

  return datesList;
};

/**
 * find new sales by filtering fetched orders
 * @param todayOrders fetched list of today orders
 * @returns newOrders a list of New Orders
 */
export const renderNewSales = (todayOrders: PeriodStatistics): Sale[] => {
  let newSales = [] as Sale[];
  // get existing sales from localstorage
  const todayOrdered = getPeriodFromStorage(Periods.Today);

  // if no today orders, notify about all new orders and return
  if (!todayOrdered) {
    notifyAboutNewSales(Object.values(todayOrders.salesList));
    return newSales;
  }

  // check if number of fetched sales is more then in cached sales
  if (todayOrders.salesNumber <= todayOrdered.salesNumber) {
    return newSales;
  }

  // get orders ID from sales list
  const ordersKeys = Object.keys(todayOrders.salesList);
  const orderedKeys = Object.keys(todayOrdered.salesList);

  // filter fetched sales
  ordersKeys.forEach((orderId) => {
    if (!orderedKeys.includes(orderId)) {
      newSales.push(todayOrders.salesList[orderId]);
    }
  });

  notifyAboutNewSales(newSales);
};

export const toggleLoader = (show: Toggler): void => {
  show == Toggler.Show
    ? document.body.classList.add(LOADER_CLASS)
    : document.body.classList.remove(LOADER_CLASS);
};

export const renderError = (message: string = ''): void => {
  document.getElementById(DATA_CONTAINER).classList.add(HIDDEN_CLASS);
  document.getElementById(ERROR_CONTAINER).classList.remove(HIDDEN_CLASS);
  document.getElementById(ERROR_CONTAINER).textContent = message;
  toggleLoader(Toggler.Hide);
};
