import Anonymous from "../Views/Anonymous/Anonymous";
import SettingsPage from "../Views/Settings/SettingsPage/SettingsPage";

type AppRoute = {
  path: string;
  element: JSX.Element;
};

/**
 * List of application routes with their components.
 * Each object represents a route and includes the path and the component to render.
 * @type {AppRoute[]}
 */
export const RoutesList: AppRoute[] = [
  {
    path: "/",
    element: <Anonymous />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/home",
    element: (
      <>
        <h1>homepage</h1>
      </>
    ),
  },
  {
    path: "*",
    element: (
      <div className="text-center">
        <h1 className="text-xl font-bold text-red-500">Page Not Found!</h1>
      </div>
    ),
  },
];
export default RoutesList;
