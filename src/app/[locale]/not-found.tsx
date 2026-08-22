"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("common.notFound");

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <Card className="mx-4 w-full max-w-md">
        <CardContent className="pt-6">
          <div className="mb-4 flex gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          </div>
          <p className="mb-6 mt-4 text-sm text-gray-600">{t("description")}</p>
          <Link href="/" className="btn-primary inline-flex text-sm">
            {t("backHome")}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
