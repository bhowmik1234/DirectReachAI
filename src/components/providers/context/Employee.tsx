"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EmailContextProps {
  cemail: string | null;
  cjobTitle: string | null;
  cjobRole: string | null;
  setEmailc: (email: string | null) => void;
  setJobTitlec: (jobTitle: string | null) => void;
  setJobRolec: (jobRole: string | null) => void;
}

const EmailContext = createContext<EmailContextProps | undefined>(undefined);

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [cemail, setEmailc] = useState<string | null>(null);
  const [cjobTitle, setJobTitlec] = useState<string | null>(null);
  const [cjobRole, setJobRolec] = useState<string | null>(null);

  return (
    <EmailContext.Provider value={{ cemail, cjobTitle, cjobRole, setEmailc, setJobTitlec, setJobRolec }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error("useEmailContext must be used within an EmailProvider");
  }
  return context;
};
