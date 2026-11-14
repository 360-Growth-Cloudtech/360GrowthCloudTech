export type LeadFormType = "contact" | "schedule-meeting";

export function trackLeadEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
    try {
      (window as unknown as { gtag: Function }).gtag("event", eventName, {
        event_category: "lead",
        ...params,
      });
    } catch {
      // non-blocking tracking failure
    }
  }
}

export async function submitLead(
  payload: Record<string, unknown> & { formType: LeadFormType },
): Promise<{ success: boolean; error?: string; warning?: string }> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as {
    success?: boolean;
    error?: string;
    warning?: string;
  };

  if (!res.ok) {
    return { success: false, error: data.error ?? "Something went wrong. Please try again." };
  }

  trackLeadEvent("generate_lead", {
    event_label: (payload.source as string) || payload.formType,
    form_type: payload.formType,
  });

  return {
    success: data.success ?? true,
    warning: data.warning,
  };
}
