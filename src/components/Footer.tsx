import logo from "@assets/logo.png";
import { Linkedin, Mail, MapPin, ArrowRight, CalendarDays, Send, Twitter, Facebook } from "lucide-react";
import { Link } from "wouter";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

export function Footer() {
  const { setOpen } = useScheduleMeeting();

  return (
    <footer data-testid="footer" style={{ backgroundColor: "#1a1512", color: "white" }}>

      {/* NEWSLETTER */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl py-16 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-5 border px-3 py-1 rounded-full" style={{ color: "rgba(255,255,255,0.45)", borderColor: "rgba(255,255,255,0.12)" }}>
            Stay Updated
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }} className="text-3xl md:text-4xl text-white mb-4">
            Never miss an insight.
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Get the latest case studies and industry trends delivered to your inbox weekly.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
              data-testid="footer-newsletter-email"
            />
            <button
              type="submit"
              className="shrink-0 btn-primary rounded-full text-sm"
              style={{ fontSize: "0.85rem", padding: "11px 22px" }}
              data-testid="footer-newsletter-subscribe"
            >
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>Join 10,000+ professionals getting weekly insights</p>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-5">
            <Link href="/">
              <img src={logo} alt="360GrowthCloudTech" className="h-10 w-auto brightness-0 invert cursor-pointer" />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Designing digital-first technologies for future growth — across software, cloud, security, and marketing.
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                <MapPin size={13} /> Tech District, Innovation Hub, San Francisco
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                <Mail size={13} /> hello@360growthcloudtech.com
              </li>
            </ul>
            <div className="flex gap-2">
              {[{ icon: Linkedin, label: "LinkedIn" }, { icon: Twitter, label: "Twitter" }, { icon: Facebook, label: "Facebook" }].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/15" style={{ background: "rgba(255,255,255,0.07)" }} data-testid={`social-${label.toLowerCase()}`}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {[{ label: "About Us", href: "/about" }, { label: "Careers", href: "/about" }, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">Services</h4>
            <ul className="space-y-3">
              {[{ label: "Consulting", href: "/services" }, { label: "Technology", href: "/services" }, { label: "Industries", href: "/industries" }].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5">Resources</h4>
            <ul className="space-y-3">
              {[{ label: "Insights", href: "/insights" }, { label: "Case Studies", href: "/case-studies" }].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SCHEDULE CARD */}
        <div
          className="rounded-2xl p-8 text-center mb-12"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          data-testid="footer-schedule-card"
        >
          <h3 className="text-xl font-bold text-white mb-2">Ready to transform your business?</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Let's discuss your project and explore how we can help you reach your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="btn-primary rounded-full"
              style={{ fontSize: "0.85rem", padding: "10px 22px" }}
              data-testid="footer-schedule-btn"
            >
              <CalendarDays size={14} /> Schedule a Meeting
            </button>
            <Link
              href="/contact"
              className="btn-outline rounded-full"
              style={{ fontSize: "0.85rem", padding: "9px 22px", color: "rgba(255,255,255,0.65)", borderColor: "rgba(255,255,255,0.15)" }}
              data-testid="footer-send-message-btn"
            >
              <Send size={14} /> Send Message
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} 360GrowthCloudTech. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-terms">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-cookies">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
