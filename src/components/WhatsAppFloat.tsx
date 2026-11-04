"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { X } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  const t = useTranslations("common.whatsapp");
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show gentle chat prompt after 1.8s
    const timer = setTimeout(() => {
      if (!dismissed) setShowPrompt(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, [dismissed]);

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-2.5">
      {/* Gentle floating speech bubble prompt */}
      {showPrompt && !dismissed && (
        <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[260px] rounded-2xl bg-white p-3.5 shadow-xl shadow-slate-900/15 border border-slate-200/90 text-left">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDismissed(true);
              setShowPrompt(false);
            }}
            aria-label="Close"
            className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={12} />
          </button>
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
              </span>
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#15803d]">
                Online • Immediate Reply
              </span>
            </div>
            <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
              👋 Need quick project advice or quote?
            </p>
            <p className="mt-0.5 text-[0.72rem] text-slate-500">
              Click to chat directly with our team on WhatsApp.
            </p>
          </a>
        </div>
      )}

      {/* Main WhatsApp Floating Button with live pulse */}
      <a
        href={CONTACT_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("chatLabel")}
        data-testid="whatsapp-float"
        className="group relative flex items-center gap-2.5 rounded-full bg-[#25D366] text-white p-3.5 sm:px-4.5 sm:py-3.5 shadow-lg shadow-[#25D366]/35 transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] hover:shadow-xl hover:shadow-[#25D366]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <span
          className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]"
          aria-hidden
        />
        <WhatsAppIcon className="relative h-7 w-7 shrink-0 text-white" />
        <span className="relative hidden text-sm font-bold tracking-tight text-white md:inline-block pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
