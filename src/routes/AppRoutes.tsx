import React from "react";
import { Routes, Route } from "react-router-dom";
import RoutesList from "./RoutesList";
/**
 * Renders application routes dynamically based on `RoutesList`.
 * @returns {JSX.Element} The rendered routes.
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {RoutesList.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
