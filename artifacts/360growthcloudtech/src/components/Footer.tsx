import logo from "@assets/logo360_(1)_1781888366275.png";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8" data-testid="footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <Link href="/">
              <img src={logo} alt="360GrowthCloudTech" className="h-12 w-auto brightness-0 invert cursor-pointer" />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              The one partner your business needs to go from idea to a live, secure, growing digital product.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors" data-testid="social-facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors" data-testid="social-twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors" data-testid="social-linkedin">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors" data-testid="social-instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-white/80 hover:text-accent transition-colors text-sm">Custom Software</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-accent transition-colors text-sm">CRM Tools</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-accent transition-colors text-sm">Digital Marketing</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-accent transition-colors text-sm">Cloud Infrastructure</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-accent transition-colors text-sm">Cybersecurity</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-accent transition-colors text-sm">E-commerce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/80 hover:text-accent transition-colors text-sm">About Us</Link></li>
              <li><Link href="/industries" className="text-white/80 hover:text-accent transition-colors text-sm">Industries</Link></li>
              <li><Link href="/case-studies" className="text-white/80 hover:text-accent transition-colors text-sm">Case Studies</Link></li>
              <li><Link href="/insights" className="text-white/80 hover:text-accent transition-colors text-sm">Insights</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-accent transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>123 Innovation Drive, Tech District, San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <Mail size={18} className="text-accent shrink-0" />
                <span>hello@360growthcloudtech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} 360GrowthCloudTech. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
