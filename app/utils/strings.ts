import { CURRENCY, CURRENCY_LOCALE, EXTENDED_SUPPORT, RENEWED_SUPPORT } from '../model/constants';

export const isExtendedSupport = (title: string): boolean => {
    return title.includes(EXTENDED_SUPPORT.toLowerCase());
};

export const isRenewedSupport = (title: string): boolean => {
    return title.includes(RENEWED_SUPPORT.toLowerCase());
};

export const isFullFee = (title: string): boolean => {
    return isExtendedSupport(title) || isRenewedSupport(title);
};

export const formatPrice = (price: number): string => {
    const formatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
        style: 'currency',
        currency: CURRENCY,
    });

    return formatter.format(price);
};
