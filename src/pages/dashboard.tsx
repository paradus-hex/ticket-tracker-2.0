import React from "react";
import SideBar from "./components/Sidebar";
import AuthShowcase from "./components/AuthShowcase";
import { useSession } from "next-auth/react";
import { Box, Card, Typography } from "@mui/material";
const Dashboard = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Card className="flex items-center justify-center">
        <Typography>Loading</Typography>
      </Card>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Box className="flex h-screen w-screen items-center justify-center">
        <Card className=" flex  items-center justify-center">
          <Typography className="p-10">Access Denied.</Typography>
        </Card>
      </Box>
    );
  }
  return (
    <div>
      <SideBar />
      <div className="mt-48">
        <AuthShowcase />
      </div>
    </div>
  );
};

export default Dashboard;
