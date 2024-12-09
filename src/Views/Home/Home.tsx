import React, { useContext } from "react";
import "./Home.css";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import Team from "../Team/Team";
import { TeamAppContext } from "../../store/team.context";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { NotificationModel } from "../../models/NotificationModel";
import { useEffect } from "react";
import { db } from "../../config/firebase-config";
import { ref, get, onValue } from "firebase/database";
import { toast } from "react-toastify";
import { UserAppContext } from "../../store/user.context";
import { setUserStatusOnline } from "../../services/user.service";

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
  const { team } = useContext(TeamAppContext);
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

        return () => unsubscribe();
      })
      .catch(error => {
        console.error("Error getting notifications", error);
        toast.error("Error getting notifications");
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserStatusOnline(user.username)
    }
  }, [user]);

  return (
    <div className="window border-base-300 flex h-screen">
      <HomeSideBar />
      {team ? (
        <Team
          notifications={notifications}
          setNotifications={setNotifications}
        />
      ) : (
        <Navigate to={"/dms"} />
      )}
    </div>
  );
};

export default Home;
