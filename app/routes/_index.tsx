import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { mock } from '~/model';
import { CurrentWeek, PreviousWeek, Today, Yesterday } from '../components/blocks';
import { StatementsContext } from '../context/context';
import { beautifyData, calculateTotals, reducer, sortByPeriods, summarize } from '../utils';

export const loader: LoaderFunction = async () => {
    // const statement = await fetchPeriods();
    const statements = mock;

    const reduced = reducer(statement);
    const byPeriodsSorted = sortByPeriods(reduced);
    const byPeriods = beautifyData(byPeriodsSorted);
    // console.log(byPeriodsSorted);

    const summary = summarize(byPeriods);
    const totals = calculateTotals(summary);

    return json({ byPeriods, summary, totals });
};

export function useInferredRouteData<T extends (args: LoaderFunctionArgs) => any>() {
    return useLoaderData<Awaited<ReturnType<T>>>();
}

export default function Index() {
    const statements = useInferredRouteData<typeof loader>();

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
