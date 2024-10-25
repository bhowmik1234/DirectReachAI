"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Profile from "@/components/home/navigation/Profile";

const SignButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Profile />
    );
  }

  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  );
};

export default SignButton;