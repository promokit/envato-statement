import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CurrentWeek, PreviousWeek, Today, Yesterday } from '../components/blocks';
import { StatementsContext } from '../context/context';
import { LoaderResponse, contextDefaults } from '../model';
import { beautifyData, calculateTotals, fetchPeriods, reducer, sortByPeriods, summarize } from '../utils';

export const loader: LoaderFunction = async () => {
    const statement = await fetchPeriods();
    // const statement = mock;
    // console.log(statement);

    if (!statement) {
        return json(contextDefaults);
    }

    const reduced = reducer(statement);
    // console.log(reduced);
    const byPeriodsSorted = sortByPeriods(reduced);

    // console.log(byPeriodsSorted);
    const byPeriods = beautifyData(byPeriodsSorted);
    // console.log(byPeriods);

    const summary = summarize(byPeriods);
    const totals = calculateTotals(summary);

    return json({ byPeriods, summary, totals });
};

export default function Index() {
    const statements: LoaderResponse = useLoaderData<typeof loader>();

    return (
        <StatementsContext.Provider value={statements}>
            <main className="grid grid-cols-2 gap-48 w-9/12 max-w-6xl mx-auto my-12">
                <Today />
                <Yesterday />
                <CurrentWeek />
                <PreviousWeek />
            </main>
        </StatementsContext.Provider>
    );
}
