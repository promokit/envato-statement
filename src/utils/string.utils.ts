import {
  EXTENDED_SUPPORT,
  RENEWED_SUPPORT,
  CURRENCY_LOCALE,
  CURRENCY,
} from '../constants';

export const isExtendedSupport = function (title: string): boolean {
  return title.includes(EXTENDED_SUPPORT.toLowerCase());
};
export const isRenewedSupport = function (title: string): boolean {
  return title.includes(RENEWED_SUPPORT.toLowerCase());
};
export const isFullFee = function (title: string): boolean {
  return isExtendedSupport(title) || isRenewedSupport(title);
};
export const formatPrice = function (price: number): string {
  const formatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY,
  });

  return formatter.format(price);
};
