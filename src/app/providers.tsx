"use client";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScheduleMeetingProvider, useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { ScheduleMeeting } from "@/components/ScheduleMeeting";
import { SmoothScroll } from "@/components/SmoothScroll";

function ScheduleMeetingGlobal() {
  const { open, setOpen } = useScheduleMeeting();
  return <ScheduleMeeting open={open} onOpenChange={setOpen} />;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <TooltipProvider>
        <ScheduleMeetingProvider>
          {children}
          <ScheduleMeetingGlobal />
          <Toaster />
        </ScheduleMeetingProvider>
      </TooltipProvider>
    </SmoothScroll>
  );
}
