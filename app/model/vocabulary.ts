import { isExtendedSupport, isRenewedSupport } from '../utils/string.utils';
import { wrapTitleSuffix } from '../view/templates';
import {
  EXTENDED_SUPPORT,
  RENEWED_SUPPORT,
  EXT_ORDERS_NUMBER,
} from './constants';

export const convertItemTitle = (
  itemId: number,
  title: string,
  quantity: number
): string => {
  const renew = isRenewedSupport(title) ? `${RENEWED_SUPPORT}` : '';
  const extend = isExtendedSupport(title)
    ? (renew && ' ') + EXTENDED_SUPPORT
    : '';

  let suffix = renew || extend ? `${renew}${extend}` : '';

  // if order contain 3 sales that mean a customer purchased an item + extended support
  if (quantity === EXT_ORDERS_NUMBER) {
    suffix = ` + ${EXTENDED_SUPPORT}`;
  }

  suffix = wrapTitleSuffix(suffix);

  switch (itemId) {
    case 24130639:
      return `Facebook Bundle${suffix}`;

    case 23987794:
      return `Esox${suffix}`;

    case 23767311:
      return `CaseMag${suffix}`;

    case 23395559:
      return `AMP Module${suffix}`;

    case 21815895:
      return `Extended Customer Features${suffix}`;

    case 21760776:
      return `Wishlist${suffix}`;

    case 21760985:
      return `Favorite Products${suffix}`;

    case 20692635:
      return `Lookbook${suffix}`;

    case 18950303:
      return `Hoki WP${suffix}`;

    case 19633702:
      return `Compare Products${suffix}`;

    case 15588501:
      return `Sconto PSD${suffix}`;

    case 19751094:
      return `Auray PSD${suffix}`;

    case 11225981:
      return `Hoki PSD${suffix}`;

    case 11176873:
      return `FullPage Slider${suffix}`;

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

    case 3775953:
      return `Avena PSD${suffix}`;

    case 3309918:
      return `NiceStore PSD${suffix}`;

    case 2622574:
      return `Alysum${suffix}`;

    default:
      return 'Unknown Item!';
  }
};
