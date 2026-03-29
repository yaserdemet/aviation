import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import {
  Page,
  DashboardPage,
  LiveTrafficPage,
  EmergencyPage,
  StatisticsPage,
} from "./elements";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout pageTitle="Radar Merkezi">
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "live-traffic",
        element: <LiveTrafficPage />,
      },
      {
        path: "emergency",
        element: <EmergencyPage />,
      },
      {
        path: "statistics",
        element: <StatisticsPage />,
      },
    ],
  },
]);
