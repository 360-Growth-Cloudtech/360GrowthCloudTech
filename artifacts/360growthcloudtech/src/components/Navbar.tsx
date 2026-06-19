import React from "react";
import { Link } from "wouter";
import logo from "@assets/logo360_(1)_1781888366275.png";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Industries", href: "#industries" },
    { name: "Why Us", href: "#why-us" },
    { name: "Process", href: "#process" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
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
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
                data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="gradient-bg px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg p-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-base font-medium text-foreground py-2 border-b border-border/50"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="gradient-bg text-center px-5 py-3 rounded-md text-base font-bold shadow-md"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}