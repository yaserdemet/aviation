import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import {
  Page,
  PlaygroundPage,
  HistoryPage,
  StarredPage,
  SettingsPage,
} from "./elements";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout pageTitle="Home">
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "playground",
        element: <PlaygroundPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "starred",
        element: <StarredPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
