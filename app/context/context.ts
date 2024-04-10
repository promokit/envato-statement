import Envato from 'envato';
import { createContext } from 'react';
import { contextDefaults, periodDefaults } from '../model/defaults';
import { Periods } from '../model/enums';
import { Statements } from '../model/types';
import { getPeriodsDates } from '../utils/time';

const client = new Envato.Client(process.env.TOKEN || '');

const periods = getPeriodsDates();

const statements: Statements = {
    [Periods.Today]: { ...periodDefaults },
    [Periods.Yesterday]: { ...periodDefaults },
    [Periods.CurrentWeek]: { ...periodDefaults },
    [Periods.PreviousWeek]: { ...periodDefaults },
    [Periods.LastTwoWeeks]: { ...periodDefaults },
};

export const context = {
    client,
    periods,
    statements,
};

export const StatementsContext = createContext(contextDefaults);
