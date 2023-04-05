import React from "react";
import ProtectedLayout from "./components/ProtectedLayout";
import { TextField, Box, Stack, Typography } from "@mui/material";
import { api } from "~/utils/api";
const CreateProject = () => {
  const { mutateAsync } = api.project.createProject.useMutation();
  return (
    <ProtectedLayout>
      <Stack className="flex items-center justify-center" gap={5}>
        <Typography variant="h5">Create A Project</Typography>
        <TextField
          helperText="Please enter the title of the project"
          id="project-title"
          label="Title"
          variant="filled"
          sx={{ width: "20%" }}
        />
        <TextField
          helperText="Please enter the project description "
          id="project-description"
          label="Description"
          variant="filled"
          multiline
          rows={5}
          sx={{ width: "30%" }}
        />
      </Stack>
    </ProtectedLayout>
  );
};

export default CreateProject;
