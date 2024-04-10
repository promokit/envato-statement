import { useLoaderData } from '@remix-run/react';

import { LoaderFunction, json } from '@remix-run/node';
import { Today, Yesterday } from '../components/blocks';
import { StatementsContext } from '../context/context';
import { mock } from '../model/mock';
import { beautifyData, reducer, sortByPeriods } from '../utils';

export const loader: LoaderFunction = async () => {
    // const statement = await fetchPeriods();
    const statement = mock;
    const filtered = reducer(statement);
    const sortedByPeriods = sortByPeriods(filtered);
    const readyData = beautifyData(sortedByPeriods);
    console.log(readyData);

    return json(readyData);
};

export default function Index() {
    const statements = useLoaderData<typeof loader>();

    return (
        <StatementsContext.Provider value={statements}>
            <main className="grid grid-cols-2 gap-48 w-9/12 max-w-6xl mx-auto my-12">
                <Today />
                <Yesterday />
                {/* <CurrentWeek /> */}
                {/* <PreviousWeek /> */}
            </main>
        </StatementsContext.Provider>
    );
}
