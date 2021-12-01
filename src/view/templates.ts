import { Sale } from '../types';
import { formatPrice } from '../utils/string.utils';

export const renderHeading = function (
  totalEarnings: number,
  salesNumber: number,
  average: number = 0
): string {
  return `<h3>${formatPrice(totalEarnings)},
    <small>${salesNumber} ${salesNumber === 1 ? 'Sale' : 'Sales'}</small>
  </h3>${renderAverage(average)}`;
};

export const renderSalesList = function (sale: Sale): string {
  return `<div>${sale.date} – ${formatPrice(sale.amount)}, 
    <strong>${sale.detail}</strong> 
    <small>(<span class="capitalize">${sale.other_party_city.toLowerCase()}</span>, <span class="capitalize">${sale.other_party_country.toLowerCase()}</span>)</small>
  </div>`;
};

export const renderStatistics = function ([title, quantity]): string {
  return `<dl>
      <dt>${title}</dt>
      <dd>${quantity}</dd>
    </dl>`;
};

export const renderAverage = function (average: number): string {
  if (!average) return '';
  return `<small>Average: ${formatPrice(average)}/day</small><br>`;
};

export const renderCurrentMonth = function (
  average: number,
  estimated: number
): string {
  return `${renderAverage(average)}<small>Estimate: ${formatPrice(
    estimated
  )}</small>`;
};
