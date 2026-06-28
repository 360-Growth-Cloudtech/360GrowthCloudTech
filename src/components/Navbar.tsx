import { useState, useEffect, useRef } from "react";
import logo from "@assets/logo.png";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { setOpen } = useScheduleMeeting();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleProgress, { passive: true });
    return () => window.removeEventListener("scroll", handleProgress);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-xl shadow-sm border-b border-border/40 py-3"
          : "bg-transparent py-5"
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2" data-testid="nav-logo-link">
              <img src={logo} alt="360GrowthCloudTech" className="h-9 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">

            {/* Services dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive("/services") || isActive("/industries")
                    ? "text-primary bg-primary/6"
                    : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                }`}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                data-testid="nav-link-services"
                style={{ background: isActive("/services") || isActive("/industries") ? "rgba(13,31,110,0.06)" : undefined }}
              >
                Services
                <ChevronDown size={13} className={`transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-52" data-testid="nav-dropdown-services">
                  <div className="bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden p-1.5 flex flex-col gap-0.5">
                    <Link
                      href="/services"
                      className="px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/6 hover:text-primary rounded-xl transition-colors"
                      style={{}}
                    >
                      All Services
                    </Link>
                    <Link
                      href="/industries"
                      className="px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/6 hover:text-primary rounded-xl transition-colors"
                    >
                      Industries
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {[
              { href: "/about", label: "About Us", testId: "nav-link-about-us" },
              { href: "/insights", label: "Insights", testId: "nav-link-insights" },
              { href: "/contact", label: "Contact", testId: "nav-link-contact-us" },
            ].map(({ href, label, testId }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(href)
                    ? "text-primary"
                    : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                }`}
                data-testid={testId}
                style={isActive(href) ? { background: "rgba(13,31,110,0.06)" } : {}}
              >
                {label}
              </Link>
            ))}

            <button
              onClick={() => setOpen(true)}
              className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold text-primary hover:bg-primary/6 transition-colors"
              data-testid="nav-link-schedule-meeting"
              style={{}}
            >
              Schedule Meeting
            </button>

            <Link
              href="/contact"
              className="ml-1 gradient-bg px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
              data-testid="nav-cta-button"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-foreground hover:bg-foreground/5 transition-colors"
              data-testid="nav-mobile-toggle"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="h-[2px] w-full bg-border/20">
        <div
          className="h-full transition-[width] duration-75 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(to right, #0d1f6e, #1a6be0, #00c5c8)",
          }}
        />
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border shadow-xl">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
            <div className="pb-4 mb-2 border-b border-border/50">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-4">Services</p>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-colors">All Services</Link>
              <Link href="/industries" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-colors">Industries</Link>
            </div>
            {[
              { href: "/about", label: "About Us" },
              { href: "/insights", label: "Insights" },
              { href: "/contact", label: "Contact Us" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(href) ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-primary/5"}`}>
                {label}
              </Link>
            ))}
            <button onClick={() => { setMobileMenuOpen(false); setOpen(true); }} className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 transition-colors">
              Schedule Meeting
            </button>
            <div className="pt-4 mt-2 border-t border-border/50">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="gradient-bg flex justify-center w-full px-5 py-3.5 rounded-xl text-sm font-bold text-white shadow-md">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
