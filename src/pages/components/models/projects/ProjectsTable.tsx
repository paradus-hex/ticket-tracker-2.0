/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  type GridRowModesModel,
  GridRowModes,
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridRowId,
  type GridRowModel,
} from "@mui/x-data-grid";
import { api } from "~/utils/api";
import { type UpdateProjectPayloadType } from "~/server/api/controllers/project.controller";

export default function ProjectsTable() {
  const { data: projectsData, isSuccess } =
    api.project.getAllProjects.useQuery();

  const utils = api.useContext();

  const { mutateAsync } = api.project.deleteProject.useMutation({
    onSuccess() {
      void utils.project.getAllProjects.invalidate();
    },
  });

  const { mutateAsync: updateProject } =
    api.project.updateProject.useMutation();

  const [rows, setRows] = React.useState(projectsData ?? []);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    if (isSuccess) setRows(projectsData);
  }, [isSuccess, projectsData, rows]);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: string) => () => {
    console.log(id, "hello");
    void mutateAsync({ id });
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow } as UpdateProjectPayloadType;

    void updateProject({
      id: updatedRow.id,
      title: updatedRow.title,
      description: updatedRow.description,
    } as UpdateProjectPayloadType);
    return updatedRow;
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 180, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 360,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id as string)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box className="flex items-center justify-center">
      <Box
        sx={{
          height: 500,
          width: "80%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
        />
      </Box>
    </Box>
  );
}
