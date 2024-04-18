import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { CurrentWeek, PreviousWeek, Today, Yesterday } from '../components/blocks';
import { StatementsContext } from '../context/context';
import { mock } from '../model/mock';
import { beautifyData, reducer, sortByPeriods, summarize } from '../utils';

export const loader: LoaderFunction = async () => {
    // const statement = await fetchPeriods();
    const statement = mock;
    const filtered = reducer(statement);
    const sortedByPeriods = sortByPeriods(filtered);
    const readyData = beautifyData(sortedByPeriods);
    const summary = summarize(readyData);

    return json({ byPeriods: readyData, summary });
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
