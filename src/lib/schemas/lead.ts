import { z } from "zod";

export const contactLeadSchema = z.object({
  formType: z.literal("contact"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0).optional(),
});

export const scheduleMeetingLeadSchema = z.object({
  formType: z.literal("schedule-meeting"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  date: z.string().optional(),
  time: z.string().optional(),
  message: z.string().optional(),
  website: z.string().max(0).optional(),
});

export const leadSchema = z.discriminatedUnion("formType", [
  contactLeadSchema,
  scheduleMeetingLeadSchema,
]);

export type LeadPayload = z.infer<typeof leadSchema>;
export type ContactLead = z.infer<typeof contactLeadSchema>;
export type ScheduleMeetingLead = z.infer<typeof scheduleMeetingLeadSchema>;

export function leadToSheetRow(lead: LeadPayload): string[] {
  const timestamp = new Date().toISOString();

  if (lead.formType === "contact") {
    return [
      timestamp,
      lead.formType,
      lead.name,
      lead.email,
      lead.phone,
      "",
      lead.service,
      "",
      "",
      lead.message,
    ];
  }

  return [
    timestamp,
    lead.formType,
    lead.name,
    lead.email,
    lead.phone ?? "",
    lead.company ?? "",
    lead.service,
    lead.date ?? "",
    lead.time ?? "",
    lead.message ?? "",
  ];
}
