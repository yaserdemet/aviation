import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import ErrorPage from "../pages/ErrorPage";
import {
  Page,
  DashboardPage,
  LiveTrafficPage,
  EmergencyPage,
  StatisticsPage,
  FlightMapPage,
  Form91Page,
  Form92Page,
  Form93Page,
  AirportsPage,
} from "./elements";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout pageTitle="Radar Merkezi">
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
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
      {
        path: "flight-map",
        element: <FlightMapPage />,
      },
      {
        path: "form-91",
        element: <Form91Page />,
      },
      {
        path: "form-92",
        element: <Form92Page />,
      },
      {
        path: "form-93",
        element: <Form93Page />,
      },
      {
        path: "airports",
        element: <AirportsPage />,
      },
    ],
  },
]);
