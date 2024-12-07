import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { useEffect } from "react";
interface DyteAppProviderProps {
  children: React.ReactNode;
}
export const DyteAppProvider: React.FC<DyteAppProviderProps> = ({
  children,
}) => {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    initMeeting({
      authToken: "<auth-token>",
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, []);

  return <DyteProvider value={meeting}>{children}</DyteProvider>;
};
