import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import RoutesList from "./RoutesList";
import { UserAppContext } from "../store/app-context";
/**
 * Renders application routes dynamically based on `RoutesList`.
 * @returns {JSX.Element} The rendered routes.
 */
export const AppRoutes: React.FC = (): JSX.Element => {
  const { loading, user } = useContext(UserAppContext);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner component if available
  }
  return (
    <Routes>
      {RoutesList.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
