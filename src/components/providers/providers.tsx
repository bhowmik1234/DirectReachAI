"use client";
import { SessionProvider } from "next-auth/react"; 

const OtherProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>

          {children}

     </SessionProvider>
  );
};

export default OtherProviders;
