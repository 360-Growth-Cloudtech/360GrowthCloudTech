export type LeadFormType = "contact" | "schedule-meeting";

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

  return {
    success: data.success ?? true,
    warning: data.warning,
  };
}
