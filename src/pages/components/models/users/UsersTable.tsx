import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  type GridRowsProp,
  type GridRowModesModel,
  GridRowModes,
  DataGrid,
  type GridColDef,
  type GridRowParams,
  type MuiEvent,
  GridActionsCellItem,
  type GridEventListener,
  type GridRowId,
  type GridRowModel,
} from "@mui/x-data-grid";
import { api } from "~/utils/api";

const initialRows: GridRowsProp = [
  {
    id: 1,
    name: "Yaseen",
    age: 25,
  },
  {
    id: 2,
    name: "Anny",
    age: 36,
  },
  {
    id: 3,
    name: "Safwan",
    age: 19,
  },
  {
    id: 4,
    name: "Saad",
    age: 28,
  },
  {
    id: 5,
    name: "Joe",
    age: 23,
  },
];

export default function UsersTable() {
  const { data: usersData, isSuccess } = api.user.getAllUsers.useQuery();
  const [rows, setRows] = React.useState(usersData ?? []);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    if (isSuccess) setRows(usersData);
  }, [isSuccess, usersData]);

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // const handleCancelClick = (id: GridRowId) => () => {
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });

  //   const editedRow = rows.find((row) => row.id === id);
  //   if (editedRow!.isNew) {
  //     setRows(rows.filter((row) => row.id !== id));
  //   }
  // };

  // const processRowUpdate = (newRow: GridRowModel) => {
  //   const updatedRow = { ...newRow, isNew: false };
  //   setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  //   return updatedRow;
  // };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 2, editable: true },
    { field: "email", headerName: "Email", flex: 2, editable: true },
    {
      field: "Role",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: ["Admin", "User"],
      flex: 1,
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
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
              // onClick={handleCancelClick(id)}
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
            onClick={handleDeleteClick(id)}
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
          width: "60%",
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
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          // processRowUpdate={processRowUpdate}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </Box>
  );
}
