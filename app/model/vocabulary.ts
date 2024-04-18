import { isExtendedSupport, isRenewedSupport } from '../utils';
import { EXTENDED_SUPPORT, EXT_ORDERS_NUMBER, RENEWED_SUPPORT } from './constants';

export const convertItemTitle = (itemId: number, title: string, quantity: number): string => {
    let suffix = '';

    if (isRenewedSupport(title)) {
        suffix += RENEWED_SUPPORT;
    }

    if (isExtendedSupport(title)) {
        suffix += `${suffix ? ' ' : ''}${EXTENDED_SUPPORT}`;
    }

    // If order contains 3 sales, indicating a customer purchased an item + extended support
    if (quantity === EXT_ORDERS_NUMBER) {
        suffix = ` (${suffix ? suffix + ' + ' : ''}${EXTENDED_SUPPORT})`;
    } else {
        suffix = suffix ? ` (${suffix})` : '';
    }

    switch (itemId) {
        case 24130639:
            return `Facebook Bundle${suffix}`;

        case 23987794:
            return `Esox${suffix}`;

        case 21815895:
            return `Extended Customer Features${suffix}`;

        case 21760776:
            return `Wishlist${suffix}`;

        case 21760985:
            return `Favorite Products${suffix}`;

        case 19633702:
            return `Compare Products${suffix}`;

        case 15588501:
            return `Sconto PSD${suffix}`;

        case 19751094:
            return `Auray PSD${suffix}`;

        case 11225981:
            return `Hoki PSD${suffix}`;

        case 8743123:
            return `Venedor${suffix}`;

        case 8368595:
            return `Granada PSD${suffix}`;

        case 6986388:
            return `Fengo PSD${suffix}`;

        case 6210977:
            return `Zonda PSD${suffix}`;

        case 5531715:
            return `Vigo PSD${suffix}`;

        case 5101438:
            return `Venedor PSD${suffix}`;

        case 4510105:
            return `Trego PSD${suffix}`;

        case 3309918:
            return `NiceStore PSD${suffix}`;

        case 2622574:
            return `Alysum${suffix}`;

        default:
            return 'Unknown Item!';
    }
};
