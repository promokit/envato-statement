import Envato from 'envato';
import { createContext } from 'react';
import { Periods, Statements, contextDefaults, periodDefaults } from '../model';

const client = new Envato.Client(process.env.TOKEN || '');

// const periods = getPeriodsDates();
const periods = '';

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
