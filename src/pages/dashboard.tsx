import React from "react";
import Layout from "./components/ProtectedLayout";
import AuthShowcase from "./components/AuthShowcase";
import { api } from "../utils/api";
const Projects = () => {
  const { data: allUsers, isLoading } = api.example.getAllUsers.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <Layout>
      <AuthShowcase />
    </Layout>
  );
};

export default Projects;
