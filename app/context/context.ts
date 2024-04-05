import Envato from 'envato';
import { Periods } from '../model/enums';
import { Statements } from '../model/types';
import { getPeriodsDates } from '../utils/time';
import { periodDefaults } from '../model/defaults';

const client = new Envato.Client(process.env.TOKEN || '');

const periods = getPeriodsDates();

const statements: Statements = {
    [Periods.Today]: { ...periodDefaults },
    [Periods.Yesterday]: { ...periodDefaults },
    [Periods.CurrentWeek]: { ...periodDefaults },
    [Periods.PreviousWeek]: { ...periodDefaults },
};

export const context = {
    client,
    periods,
    statements
}