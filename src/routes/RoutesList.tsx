import Authenticated from "../hoc/Authenticated/Authenticated";
import Anonymous from "../Views/Anonymous/Anonymous";
import Home from "../Views/Home/Home";
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
    element: (
      <>
        <Authenticated>
          <SettingsPage />
        </Authenticated>
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <Authenticated>
          <Home />
        </Authenticated>
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
