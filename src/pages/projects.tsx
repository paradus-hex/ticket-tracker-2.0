import React from "react";
import ProjectsTable from "./components/models/projects/ProjectsTable";
import Layout from "./components/ProtectedLayout";
const Projects = () => {
  return (
    <Layout>
      <ProjectsTable />
    </Layout>
  );
};

export default Projects;
