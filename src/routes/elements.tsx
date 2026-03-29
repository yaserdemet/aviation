import { Suspense, lazy, type ElementType } from 'react';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
    (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );

// ----------------------------------------------------------------------

export const Page = Loadable(lazy(() => import('../pages/Home')));
export const DashboardPage = Loadable(lazy(() => import('../pages/Dashboard')));
export const LiveTrafficPage = Loadable(lazy(() => import('../pages/LiveTraffic')));
export const EmergencyPage = Loadable(lazy(() => import('../pages/EmergencyPage')));
export const StatisticsPage = Loadable(lazy(() => import('../pages/Charts')));