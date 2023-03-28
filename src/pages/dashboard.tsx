import React from "react";
import SideBar from "./components/Sidebar";
import { useSession } from "next-auth/react";
const Dashboard = () => {
  const { data: sessionData } = useSession();
  return (
    <div>
      <SideBar />
      <div className="mt-36 flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
