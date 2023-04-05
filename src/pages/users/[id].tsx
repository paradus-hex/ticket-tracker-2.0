/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import ProtectedLayout from "../components/ProtectedLayout";
import UserCard, { type User } from "../components/models/users/UserCard";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
const IndividualUserPage = () => {
  const { id } = useRouter().query;
  const { data, isLoading, isSuccess } = api.user.getUserById.useQuery({ id });

  let dummyUser;

  if (data && isSuccess) {
    dummyUser = {
      name: data.name,
      email: data.email,
      image: data.image,
      role: data.role,
    } as User;
  }

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      </ProtectedLayout>
    );
  }
  return (
    <ProtectedLayout>
      {isSuccess && data && (
        <div
          className="flex min-h-screen items-center justify-center"
          onClick={() => console.log(id)}
        >
          <UserCard user={dummyUser as User} />
        </div>
      )}
    </ProtectedLayout>
  );
};

export default IndividualUserPage;
