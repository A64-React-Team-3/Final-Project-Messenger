import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserAppProvider } from "./store/UserAppProvider";
import { TeamAppProvider } from "./store/TeamAppProvider";

const App: React.FC = () => {
  return (
    <UserAppProvider>
      <TeamAppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TeamAppProvider>
    </UserAppProvider>
  );
};

export default App;
