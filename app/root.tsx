import { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import stylesheet from './index.css?url';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
    { rel: 'preload', href: '/fonts/Tinos-700.woff2', as: 'font', type: 'font/woff2' },
    { rel: 'preload', href: '/fonts/OpenSans-700.woff2', as: 'font', type: 'font/woff2' },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
