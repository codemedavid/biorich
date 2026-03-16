import React from 'react';
import { Truck, FlaskConical, Mail, MapPin, Instagram, HelpCircle, FileText, BookOpen, Tag, Phone, MessageCircle, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 pt-16 pb-8 border-t border-charcoal-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src="/logo.png"
              alt="BIORICH"
              className="h-14 w-auto object-contain bg-white/10 rounded-lg p-2"
            />
            <p className="text-charcoal-400 text-sm max-w-xs text-center md:text-left">
              Advanced peptide solutions designed for innovation and research. Lab-tested, high-purity formulations you can trust.
            </p>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">Contact Us</h3>
            <a
              href="mailto:Reechsendin@gmail.com"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <Mail className="w-4 h-4" />
              Reechsendin@gmail.com
            </a>
            <a
              href="tel:+639765719350"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              +63 976 571 9350
            </a>
            <div className="text-charcoal-300 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              Marilao, Bulacan
            </div>
            <a
              href="viber://chat/?number=639765719350"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on Viber
            </a>
            <a
              href="https://wa.me/639765719350"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Contact on WhatsApp
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">Follow Us</h3>
            <a
              href="https://www.facebook.com/biorichscience/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/biorichscience"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <Instagram className="w-4 h-4" />
              @biorichscience
            </a>
            <a
              href="https://www.tiktok.com/@biorich2026"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.28 8.28 0 004.76 1.5v-3.5a4.84 4.84 0 01-1-.14z"/>
              </svg>
              @biorich2026
            </a>
            <a
              href="https://biorichscience.zite.so"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <Globe className="w-4 h-4" />
              biorichscience.zite.so
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">Quick Links</h3>
            <a
              href="#"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <FlaskConical className="w-4 h-4" />
              Products
            </a>
            <a
              href="/track-order"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <Truck className="w-4 h-4" />
              Track Order
            </a>
            <a
              href="/faq"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </a>
            <a
              href="/coa"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <FileText className="w-4 h-4" />
              Certificate of Analysis
            </a>
            <a
              href="/protocols"
              className="text-charcoal-300 hover:text-brand-400 transition-colors flex items-center gap-2 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Protocols
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-charcoal-800 mb-6" />

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-xs text-charcoal-500 flex items-center justify-center gap-1">
            Made with
            © {currentYear} BIORICH.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
