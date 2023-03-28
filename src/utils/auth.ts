import { signIn, signOut } from "next-auth/react";

export const handleSignIn = () => {
  void signIn(undefined, { callbackUrl: "/dashboard" });
};

export const handleSignOut = () => void signOut({ callbackUrl: "/" });
