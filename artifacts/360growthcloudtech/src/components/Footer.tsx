import logo from "@assets/logo360_(1)_1781888366275.png";
import { Linkedin, Mail, MapPin, ArrowRight, CalendarDays, Send } from "lucide-react";
import { Link } from "wouter";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

export function Footer() {
  const { setOpen } = useScheduleMeeting();

  return (
    <footer data-testid="footer" style={{ backgroundColor: "#0d1424", color: "white" }}>

      {/* NEWSLETTER SECTION */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-16 text-center">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-5 border px-3 py-1 rounded-full"
            style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.15)" }}
          >
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Never Miss an Insight
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Subscribe to our newsletter and get the latest insights, case studies, and industry
            trends delivered directly to your inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
              data-testid="footer-newsletter-email"
            />
            <button
              type="submit"
              className="shrink-0 flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-lg text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#4f6ef7", color: "white" }}
              data-testid="footer-newsletter-subscribe"
            >
              Subscribe <ArrowRight size={15} />
            </button>
          </form>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Join 10,000+ professionals getting weekly insights
          </p>
        </div>
      </div>

      {/* MAIN FOOTER COLUMNS */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/">
              <img
                src={logo}
                alt="360GrowthCloudTech"
                className="h-11 w-auto brightness-0 invert cursor-pointer"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              Designing digital-first technologies for future growth with digitally connected innovative products across multiple industries.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <MapPin size={12} />
                </div>
                Tech District, Innovation Hub
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <Mail size={12} />
                </div>
                hello@360growthcloudtech.com
              </li>
            </ul>
            <a
              href="#"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:opacity-80"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              data-testid="social-linkedin"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Consulting", href: "/services" },
                { label: "Technology", href: "/services" },
                { label: "Industries", href: "/industries" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: "Insights", href: "/insights" },
                { label: "Case Studies", href: "/case-studies" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SCHEDULE A MEETING CARD */}
        <div
          className="rounded-2xl p-8 text-center mb-12"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          data-testid="footer-schedule-card"
        >
          <h3 className="text-xl font-bold text-white mb-2">Schedule a Meeting</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Ready to transform your business? Let's discuss your project and explore how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#4f6ef7", color: "white" }}
              data-testid="footer-schedule-btn"
            >
              <CalendarDays size={15} />
              Schedule a Meeting
            </button>
            <Link
              href="/contact"
              className="flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
              data-testid="footer-send-message-btn"
            >
              <Send size={15} />
              Send Message
            </Link>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} 360GrowthCloudTech. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-terms">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-cookies">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
