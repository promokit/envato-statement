import { ENVATO_FULL_FEE, ENVATO_PARTIAL_FEE } from '../model/constants';

export const applyEnvatoFee = (amount: number, isFullFee: boolean): number => {
  const fee = isFullFee ? ENVATO_FULL_FEE : ENVATO_PARTIAL_FEE;
  return amount - (amount * fee) / 100;
};
