"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CONTACT_PHONE } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/submit-lead";
import { Loader2 } from "lucide-react";

const SERVICE_OPTIONS = [
  { value: "software", labelKey: "software" },
  { value: "crm", labelKey: "crm" },
  { value: "marketing", labelKey: "marketing" },
  { value: "cloud", labelKey: "cloud" },
  { value: "ecommerce", labelKey: "ecommerce" },
  { value: "other", labelKey: "otherFullSuite" },
] as const;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website?: string;
};

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("common.forms");
  const tCta = useTranslations("common.ctas");
  const tToast = useTranslations("common.toasts");

  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("validation.nameRequired")),
        email: z.string().email(t("validation.invalidEmail")),
        phone: z.string().min(10, t("validation.phoneRequired")),
        service: z.string().min(1, t("validation.selectService")),
        message: z.string().min(10, t("validation.messageMinLength")),
        website: z.string().optional(),
      }),
    [t],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitLead({ formType: "contact", ...data });

      if (!result.success) {
        toast({
          title: tToast("messageFailedTitle"),
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: tToast("messageSentTitle"),
        description: result.warning ?? tToast("messageSentDescription"),
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-border/50" data-testid="contact-form-container">
      <h3 className="text-2xl font-bold mb-6 text-foreground">{t("sendMessageTitle")}</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot — hidden from users, bots may fill it */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            {...form.register("website")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fullName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("placeholders.name")} {...field} data-testid="input-name" />
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
                  <FormLabel>{t("emailAddress")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("placeholders.email")} {...field} data-testid="input-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phoneNumber")}</FormLabel>
                  <FormControl>
                    <Input placeholder={CONTACT_PHONE} {...field} data-testid="input-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("serviceOfInterest")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-service">
                        <SelectValue placeholder={t("placeholders.selectService")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SERVICE_OPTIONS.map(({ value, labelKey }) => (
                        <SelectItem key={value} value={value}>
                          {t(`services.${labelKey}`)}
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
                <FormLabel>{t("projectDetails")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("placeholders.projectDetails")}
                    className="min-h-[120px]"
                    {...field}
                    data-testid="input-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gradient-bg hover:opacity-90 h-12 text-base font-bold shadow-lg"
            data-testid="button-submit-contact"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="me-2 h-4 w-4 animate-spin" />
                {t("sending")}
              </>
            ) : (
              tCta("requestConsultation")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
