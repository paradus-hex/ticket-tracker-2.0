import React from "react";
import UsersTable from "./components/models/users/UsersTable";
import ProtectedLayout from "./components/ProtectedLayout";

const Users = () => {
  return (
    <ProtectedLayout>
      <UsersTable />
    </ProtectedLayout>
  );
};

export default Users;
