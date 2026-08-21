"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ScheduleMeetingContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ScheduleMeetingContext = createContext<ScheduleMeetingContextType | undefined>(undefined);

export function ScheduleMeetingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ScheduleMeetingContext.Provider value={{ open, setOpen }}>
      {children}
    </ScheduleMeetingContext.Provider>
  );
}

export function useScheduleMeeting() {
  const context = useContext(ScheduleMeetingContext);
  if (context === undefined) {
    throw new Error("useScheduleMeeting must be used within a ScheduleMeetingProvider");
  }
  return context;
}
