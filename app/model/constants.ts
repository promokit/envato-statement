const { TOKEN } = process.env;

export const CLIENT_PARAMS = {
    token: TOKEN,
    userAgent: 'Promokit account statistics',
};
// elements classes/IDs
export const WEEKDAY_CONTAINER = 'weekday';
export const TODAY_CONTAINER = 'day-sales';
export const COUNTDOWN_CONTAINER = 'countdown';
export const NEW_SALES_CONTAINER = 'new-sales';
export const DATA_CONTAINER = 'data-container';
export const ERROR_CONTAINER = 'error-container';
export const YESTERDAY_CONTAINER = 'yesterday-sales';
export const CURRENT_WEEK_CONTAINER = 'current-week-sales';
export const PREVIOUS_WEEK_CONTAINER = 'previous-week-sales';
export const LASTUPDATE_CONTAINER = 'last-update';
export const TIMEOUT_ELEMENT = 'refresh-timeout';
export const PREVIOUS_MONTH = 'previous-month';
export const CURRENT_MONTH = 'current-month';
export const MONTH_GRAPH = 'months-graph';
export const MONTH_GRAPH_CONTAINER = 'months-earnings';
export const DAYS_GRAPH_CONTAINER = 'days-earnings';
export const DAYS_GRAPH = 'days-graph';
export const LOADER_ELEMENT = 'loader';
export const CLOCK_CONTAINER = 'clock';
export const HIDDEN_CLASS = 'hidden';
export const LOADER_CLASS = 'loading';
// configuration
const timeout = 9; //parseInt(document.getElementById(TIMEOUT_ELEMENT).getAttribute('content'));
export const REFRESH_TIMEOUT = timeout * 1000; // refresh timeout in miliseconds
export const AU_TIMEZONE = 'Australia/Sydney';
export const SUITABLE_TIME_FORMAT = 'en-GB';
export const CURRENCY = 'USD'; // order currency
export const CURRENCY_LOCALE = 'en-US'; // order locale
export const LOCAL_LOCALE = 'pl-PL';
export const WEEKDAYS_NUM = 7;
export const GRAPH_MONTHS = 15;
export const ENVATO_FULL_FEE = 30; // percents
export const ENVATO_PARTIAL_FEE = 12.5; // percents
export const EXT_ORDERS_NUMBER = 3; // number of sales that mean a customer purchased an item + extended support
export const EXTENDED_SUPPORT = 'Extended Support'; // part of order title
export const RENEWED_SUPPORT = 'Renewed Support'; // part of order title
// assets
export const AUDIO_FILE = '/ding.m4a';
export const ONEDAY = 86400000; // ms

export const allowedKeys = [
    'unique_id',
    'date',
    'order_id',
    'type',
    'detail',
    'item_id',
    'amount',
    'other_party_country',
    'other_party_city',
];
