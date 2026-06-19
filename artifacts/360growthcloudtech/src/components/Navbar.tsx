import { useState, useEffect, useRef } from "react";
import logo from "@assets/logo360_(1)_1781888366275.png";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavbarProps {
  onScheduleClick?: () => void;
}

export function Navbar({ onScheduleClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleScheduleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onScheduleClick) {
      onScheduleClick();
    }
  };

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
            <a
              href="#"
              onClick={(e) => scrollToSection(e, "#hero")}
              className="flex items-center gap-2"
              data-testid="nav-logo-link"
            >
              <img src={logo} alt="360GrowthCloudTech" className="h-10 w-auto" />
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                data-testid="nav-link-services"
              >
                Services <ChevronDown size={14} className={`transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48" data-testid="nav-dropdown-services">
                  <div className="bg-white rounded-lg shadow-xl border border-border/50 overflow-hidden flex flex-col">
                    <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="px-4 py-3 text-sm hover:bg-slate-50 transition-colors">Consulting</a>
                    <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="px-4 py-3 text-sm hover:bg-slate-50 transition-colors">Technology</a>
                    <a href="#industries" onClick={(e) => scrollToSection(e, "#industries")} className="px-4 py-3 text-sm hover:bg-slate-50 transition-colors">Industries</a>
                  </div>
                </div>
              )}
            </div>

            <a href="#about-us" onClick={(e) => scrollToSection(e, "#about-us")} className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" data-testid="nav-link-about-us">
              About Us
            </a>
            <a href="#case-studies" onClick={(e) => scrollToSection(e, "#case-studies")} className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" data-testid="nav-link-case-studies">
              Case Studies
            </a>
            <a href="#insights" onClick={(e) => scrollToSection(e, "#insights")} className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" data-testid="nav-link-insights">
              Insights
            </a>
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" data-testid="nav-link-contact-us">
              Contact Us
            </a>
            
            <button
              onClick={handleScheduleClick}
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors border-b-2 border-transparent hover:border-primary pb-0.5"
              data-testid="nav-link-schedule-meeting"
            >
              Schedule Meeting
            </button>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="gradient-bg px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              data-testid="nav-cta-button"
            >
              Get Started
            </a>
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg flex flex-col max-h-[80vh] overflow-y-auto">
          <div className="p-4 flex flex-col space-y-2">
            <div className="flex flex-col border-b border-border/50 pb-2">
              <span className="text-base font-bold text-foreground py-2">Services</span>
              <div className="pl-4 flex flex-col space-y-2 border-l-2 border-border/30 ml-2">
                <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="text-sm text-foreground/80 py-1">Consulting</a>
                <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="text-sm text-foreground/80 py-1">Technology</a>
                <a href="#industries" onClick={(e) => scrollToSection(e, "#industries")} className="text-sm text-foreground/80 py-1">Industries</a>
              </div>
            </div>
            <a href="#about-us" onClick={(e) => scrollToSection(e, "#about-us")} className="text-base font-medium text-foreground py-2 border-b border-border/50">About Us</a>
            <a href="#case-studies" onClick={(e) => scrollToSection(e, "#case-studies")} className="text-base font-medium text-foreground py-2 border-b border-border/50">Case Studies</a>
            <a href="#insights" onClick={(e) => scrollToSection(e, "#insights")} className="text-base font-medium text-foreground py-2 border-b border-border/50">Insights</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="text-base font-medium text-foreground py-2 border-b border-border/50">Contact Us</a>
            <button onClick={handleScheduleClick} className="text-left text-base font-medium text-primary py-2 border-b border-border/50">Schedule Meeting</button>
            <div className="pt-4">
              <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="gradient-bg flex justify-center w-full px-5 py-3 rounded-md text-base font-bold text-white shadow-md">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
