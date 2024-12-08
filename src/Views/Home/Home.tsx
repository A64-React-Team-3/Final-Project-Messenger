import React from "react";
import "./Home.css";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import Team from "../Team/Team";
import { useState } from "react";
import { NotificationModel } from "../../models/NotificationModel";
import { useEffect } from "react";
import { db } from "../../config/firebase-config";
import { ref, get, onValue } from "firebase/database";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserAppContext } from "../../store/user.context";


/**
 * Home Component
 *
 * This component serves as the home page for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered `Home` component.
 */
const Home: React.FC = (): JSX.Element => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const { user } = useContext(UserAppContext);

  useEffect(() => {
    const notificationsRef = ref(db, `users/${user?.username}/notifications`);
    get(notificationsRef)
      .then(_snapshot => {
        const unsubscribe = onValue(notificationsRef, snapshot => {
          if (snapshot.exists()) {
            const notificationsData = snapshot.val();
            setNotifications(Object.values(notificationsData));
            console.log("Notifications", notifications);
          } else {
            console.log("No notifications available");
            setNotifications([]);
          }
        });

        return () => unsubscribe;
      })
      .catch(error => {
        console.error("Error getting notifications", error);
        toast.error("Error getting notifications");
      });
  }, [user]);

  return (
    <div className="window border-base-300 flex h-screen">
      <HomeSideBar />
      <Team notifications={notifications} setNotifications={setNotifications} />
    </div>
  );
};

export default Home;
