"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CONTACT_PHONE } from "@/lib/contact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/submit-lead";

const SERVICE_OPTIONS = [
  { value: "software", labelKey: "software" },
  { value: "crm", labelKey: "crm" },
  { value: "marketing", labelKey: "marketing" },
  { value: "cloud", labelKey: "cloud" },
  { value: "ecommerce", labelKey: "ecommerce" },
  { value: "other", labelKey: "other" },
] as const;

const TIME_SLOT_KEYS = ["morning", "afternoon", "evening"] as const;

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  date?: string;
  time?: string;
  message?: string;
  website?: string;
};

interface ScheduleMeetingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleMeeting({ open, onOpenChange }: ScheduleMeetingProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const t = useTranslations("common.scheduleMeeting");
  const tForm = useTranslations("common.forms");
  const tCta = useTranslations("common.ctas");

  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, tForm("validation.nameRequired")),
        email: z.string().email(tForm("validation.invalidEmail")),
        phone: z.string().optional(),
        company: z.string().optional(),
        service: z.string().min(1, tForm("validation.selectService")),
        date: z.string().optional(),
        time: z.string().optional(),
        message: z.string().optional(),
        website: z.string().optional(),
      }),
    [tForm],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      date: "",
      time: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitLead({ formType: "schedule-meeting", ...data });

      if (!result.success) {
        setSubmitError(result.error ?? t("genericError"));
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        form.reset();
        setTimeout(() => setIsSuccess(false), 500);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white" data-testid="schedule-meeting-modal">
        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <DialogTitle className="text-2xl font-bold">{t("successTitle")}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {t("successDescription")}
            </DialogDescription>
            <Button onClick={() => onOpenChange(false)} className="mt-6 gradient-bg" data-testid="btn-close-success">
              {tCta("close")}
            </Button>
          </div>
        ) : (
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold">{t("title")}</DialogTitle>
              <DialogDescription>{t("description")}</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  {...form.register("website")}
                />

                {submitError && (
                  <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                    {submitError}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tForm("fullNameRequired")}</FormLabel>
                        <FormControl>
                          <Input placeholder={tForm("placeholders.name")} {...field} data-testid="schedule-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tForm("emailAddressRequired")}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={tForm("placeholders.email")} {...field} data-testid="schedule-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tForm("phoneNumber")}</FormLabel>
                        <FormControl>
                          <Input placeholder={CONTACT_PHONE} {...field} data-testid="schedule-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tForm("companyName")}</FormLabel>
                        <FormControl>
                          <Input placeholder={tForm("placeholders.company")} {...field} data-testid="schedule-company" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tForm("serviceOfInterestRequired")}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="schedule-service">
                            <SelectValue placeholder={tForm("placeholders.selectService")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SERVICE_OPTIONS.map(({ value, labelKey }) => (
                            <SelectItem key={value} value={value}>
                              {tForm(`services.${labelKey}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tForm("preferredDate")}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="schedule-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tForm("preferredTime")}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="schedule-time">
                              <SelectValue placeholder={tForm("placeholders.selectTime")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIME_SLOT_KEYS.map((key) => (
                              <SelectItem key={key} value={key}>
                                {tForm(`timeSlots.${key}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tForm("message")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tForm("placeholders.scheduleMessage")}
                          className="min-h-[80px]"
                          {...field}
                          data-testid="schedule-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-bg mt-4"
                  data-testid="schedule-submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="me-2 h-4 w-4 animate-spin" />
                      {tForm("submitting")}
                    </>
                  ) : (
                    tCta("confirmMeeting")
                  )}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
