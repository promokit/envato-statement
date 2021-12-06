import { Sale } from '../types';
import { formatPrice } from '../utils/string.utils';

export const renderHeading = function (
  totalEarnings: number,
  salesNumber: number
): string {
  return `<h3>
  <span>$</span>${Math.round(totalEarnings)} 
  <small>/ ${salesNumber} ${salesNumber === 1 ? 'Sale' : 'Sales'}</small>
  </h3>`;
};

export const renderSalesList = function (sale: Sale): string {
  return `<div class="order-item">
  <time>${sale.date}</time>
  <div class="flex-grow">
      <dl>
          <dt class="order-title flex-grow">
              <span>${sale.detail}</span>
          </dt>
          <dd class="order-price">
              <span>$<strong>${sale.amount}</strong></span>
          </dd>
      </dl>
      <div class="order-origin capitalize">${sale.other_party_city.toLowerCase()}, ${sale.other_party_country.toLowerCase()}</div>
  </div>
</div>`;
};

export const renderStatistics = function ([title, quantity]): string {
  return `<dl class="item-summary">
      <dt><span>${title}</span></dt>
      <dd><span>${quantity}</span></dd>
    </dl>`;
};

export const renderAverage = function (average: number): string {
  return average
    ? `<div class="average">Average: ${formatPrice(average)}/day</div>`
    : '';
};

export const renderEstimate = function (estimated: number): string {
  return estimated
    ? `<div class="estimate">Estimate: ${formatPrice(estimated)}</div>`
    : '';
};

export const wrapTitleSuffix = function (suffix: string = ''): string {
  return suffix ? ` <small>(${suffix})</small>` : '';
};
