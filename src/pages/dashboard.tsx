/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import ProtectedLayout from "./components/ProtectedLayout";
import AuthShowcase from "./components/AuthShowcase";
import UserCard, { type User } from "./components/models/users/UserCard";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";

const Projects = () => {
  const { data } = useSession();

  let clickedUser;

  if (data) {
    clickedUser = {
      name: data.user.name,
      email: data.user.email,
      image: data.user.image,
      role: data.user.role,
    } as User;
  }

  return (
    <ProtectedLayout>
      {clickedUser && (
        <Box className="flex justify-center">
          <UserCard user={clickedUser} />
        </Box>
      )}
      <AuthShowcase />
    </ProtectedLayout>
  );
};

export default Projects;
