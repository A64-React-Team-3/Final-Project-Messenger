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
    console.log(`${import.meta.env.VITE_DYTE_AUTH_TOKEN}`);

    initMeeting({
      authToken: "Basic 442ef3d270cf030b5470",
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, []);

  return <DyteProvider value={meeting}>{children}</DyteProvider>;
};
