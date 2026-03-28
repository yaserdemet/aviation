import { Suspense, lazy, type ElementType } from 'react';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
    (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );

// ----------------------------------------------------------------------

export const Page = Loadable(lazy(() => import('../pages/page1')));
export const PlaygroundPage = Loadable(lazy(() => import('../pages/playground')));
export const HistoryPage = Loadable(lazy(() => import('../pages/history')));
export const StarredPage = Loadable(lazy(() => import('../pages/starred')));
export const SettingsPage = Loadable(lazy(() => import('../pages/settings')));