import React from "react";
import ProtectedLayout from "./components/ProtectedLayout";
import AuthShowcase from "./components/AuthShowcase";
const Projects = () => {
  return (
    <ProtectedLayout>
      <AuthShowcase />
    </ProtectedLayout>
  );
};

export default Projects;
