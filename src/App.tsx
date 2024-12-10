import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserAppProvider } from "./store/UserAppProvider";
import { TeamAppProvider } from "./store/TeamAppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DyteAppContext } from "./store/Dyte/dyte.context";

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string>("");

  return (
    <>
      <UserAppProvider>
        <TeamAppProvider>
          <BrowserRouter>
            <DyteAppContext.Provider value={{ authToken, setAuthToken }}>
              <AppRoutes />
            </DyteAppContext.Provider>
          </BrowserRouter>
        </TeamAppProvider>
      </UserAppProvider>
      <ToastContainer />
    </>
  );
};

export default App;
