import React from "react";
import { Routes, Route } from "react-router-dom";
import Authenticated from "../hoc/Authenticated/Authenticated";
import Anonymous from "../Views/Anonymous/Anonymous";
import Home from "../Views/Home/Home";
import SettingsPage from "../Views/Settings/SettingsPage/SettingsPage";

/**
 * Renders application routes.
 * @returns {JSX.Element} The rendered routes.
 */
export const AppRoutes: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Anonymous />} />
      <Route
        path="/home"
        element={
          <Authenticated>
            <Home />
          </Authenticated>
        }
      />
      <Route
        path="/settings"
        element={
          <Authenticated>
            <SettingsPage />
          </Authenticated>
        }
      />
      {/* <Route path="*" element={<></>} /> */}
    </Routes>
  );
};

export default AppRoutes;
