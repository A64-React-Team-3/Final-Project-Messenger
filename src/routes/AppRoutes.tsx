import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Authenticated from "../hoc/Authenticated/Authenticated";
import Anonymous from "../Views/Anonymous/Anonymous";
import Home from "../Views/Home/Home";
import SettingsPage from "../Views/Settings/SettingsPage/SettingsPage";
import Personal from "../Views/Personal/Personal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
// import { DyteAppProvider } from "../store/Dyte/DyteAppProvider";

/**
 * Renders application routes.
 * @returns {JSX.Element} The rendered routes.
 */
export const AppRoutes: React.FC = (): JSX.Element => {
  const [authUser] = useAuthState(auth);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>{authUser ? <Navigate to="/home" replace /> : <Anonymous />}</>
        }
      />
      <Route
        path="/home"
        element={
          <Authenticated>
            {/* <DyteAppProvider> */}
            <Home />
            {/* </DyteAppProvider> */}
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
      <Route
        path="/dms"
        element={
          <Authenticated>
            <Personal />
          </Authenticated>
        }
      />
      {/* <Route path="*" element={<></>} /> */}
    </Routes>
  );
};

export default AppRoutes;
