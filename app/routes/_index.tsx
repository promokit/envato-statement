import { json, useLoaderData } from '@remix-run/react';
import {Today, Yesterday, CurrentWeek, PreviousWeek} from './app/components/Blocks';

import './styles.css';

import { context } from '../context/context'

export const loader = async () => {

    const data = {
        context
    };

    return json({});
}

export default function Index() {
    useLoaderData<typeof loader>();
    return (
        <main>
            <Today />
            <Yesterday />
            <CurrentWeek />
            <PreviousWeek />
        </main>
    );
}
