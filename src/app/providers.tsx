"use client";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScheduleMeetingProvider } from "@/hooks/useScheduleMeeting";
import { SmoothScroll } from "@/components/SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <TooltipProvider>
        <ScheduleMeetingProvider>
          {children}
          <Toaster />
        </ScheduleMeetingProvider>
      </TooltipProvider>
    </SmoothScroll>
  );
}
