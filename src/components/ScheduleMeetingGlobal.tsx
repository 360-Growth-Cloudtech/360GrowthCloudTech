"use client";

import { ScheduleMeeting } from "@/components/ScheduleMeeting";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

export function ScheduleMeetingGlobal() {
  const { open, setOpen } = useScheduleMeeting();
  return <ScheduleMeeting open={open} onOpenChange={setOpen} />;
}
