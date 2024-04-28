import { isFullFee } from '.';
import { ENVATO_FULL_FEE, ENVATO_PARTIAL_FEE } from '../model/constants';

export const applyEnvatoFee = (amount: number, detail: string): number => {
    const fee = isFullFee(detail) ? ENVATO_FULL_FEE : ENVATO_PARTIAL_FEE;
    return amount - (amount * fee) / 100;
};
