import { useState, useEffect, useRef } from "react";
import logo from "@assets/logo360_(1)_1781888366275.png";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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

  const isActive = (path: string) => location === path;
  
  const linkClass = (path: string) => 
    `text-sm font-semibold transition-colors ${
      isActive(path) ? "text-primary font-bold" : "text-foreground/80 hover:text-primary"
    }`;

  const mobileLinkClass = (path: string) => 
    `text-base font-medium py-2 border-b border-border/50 ${
      isActive(path) ? "text-primary font-bold" : "text-foreground"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2" data-testid="nav-logo-link">
              <img src={logo} alt="360GrowthCloudTech" className="h-10 w-auto" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive("/services") || isActive("/industries") ? "text-primary font-bold" : "text-foreground/80 hover:text-primary"
                }`}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                data-testid="nav-link-services"
              >
                Services <ChevronDown size={14} className={`transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48" data-testid="nav-dropdown-services">
                  <div className="bg-white rounded-lg shadow-xl border border-border/50 overflow-hidden flex flex-col">
                    <Link href="/services" className="px-4 py-3 text-sm hover:bg-slate-50 transition-colors">All Services</Link>
                    <Link href="/industries" className="px-4 py-3 text-sm hover:bg-slate-50 transition-colors">Industries</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className={linkClass("/about")} data-testid="nav-link-about-us">
              About Us
            </Link>
            <Link href="/case-studies" className={linkClass("/case-studies")} data-testid="nav-link-case-studies">
              Case Studies
            </Link>
            <Link href="/insights" className={linkClass("/insights")} data-testid="nav-link-insights">
              Insights
            </Link>
            <Link href="/contact" className={linkClass("/contact")} data-testid="nav-link-contact-us">
              Contact Us
            </Link>
            
            <button
              onClick={() => setOpen(true)}
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors border-b-2 border-transparent hover:border-primary pb-0.5"
              data-testid="nav-link-schedule-meeting"
            >
              Schedule Meeting
            </button>

            <Link
              href="/contact"
              className="gradient-bg px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              data-testid="nav-cta-button"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground p-2"
              data-testid="nav-mobile-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg flex flex-col max-h-[80vh] overflow-y-auto">
          <div className="p-4 flex flex-col space-y-2">
            <div className="flex flex-col border-b border-border/50 pb-2">
              <span className="text-base font-bold text-foreground py-2">Services</span>
              <div className="pl-4 flex flex-col space-y-2 border-l-2 border-border/30 ml-2">
                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 py-1">All Services</Link>
                <Link href="/industries" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 py-1">Industries</Link>
              </div>
            </div>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/about")}>About Us</Link>
            <Link href="/case-studies" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/case-studies")}>Case Studies</Link>
            <Link href="/insights" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/insights")}>Insights</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/contact")}>Contact Us</Link>
            <button onClick={() => { setMobileMenuOpen(false); setOpen(true); }} className="text-left text-base font-medium text-primary py-2 border-b border-border/50">Schedule Meeting</button>
            <div className="pt-4">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="gradient-bg flex justify-center w-full px-5 py-3 rounded-md text-base font-bold text-white shadow-md">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
