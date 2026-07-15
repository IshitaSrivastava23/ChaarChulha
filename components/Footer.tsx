import Image from "next/image";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="bg-charcoal-900 pb-8 pt-14 text-cream-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10 p-1">
              <Image src="/logo.jpeg" alt="Chaar Chulha logo" width={40} height={40} className="h-full w-full rounded-full object-cover" />
            </span>
            <span className="font-display text-lg font-semibold text-cream-50">Chaar Chulha</span>
          </div>
          <p id="story" className="mt-4 max-w-xs font-body text-sm leading-relaxed text-cream-100/70">
            Food that feels like home. We started Chaar Chulha with one idea: Pune deserves meals that
            taste like they came from a family kitchen, not a factory line — cooked fresh, every single day.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href="https://instagram.com" label="Instagram">
              <Instagram size={17} />
            </SocialLink>
            <SocialLink href="https://facebook.com" label="Facebook">
              <Facebook size={17} />
            </SocialLink>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">
            Get in Touch
          </h3>
          <ul className="mt-4 flex flex-col gap-3 font-body text-sm text-cream-100/80">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
              Pune, Maharashtra, India
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold-400" />
              <a href="mailto:orders@chaarchulha.com" className="hover:text-cream-50">
                orders@chaarchulha.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold-400" />
              <a href="https://wa.me/917888037948" className="hover:text-cream-50">
                +91 78880 37948 (WhatsApp orders)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">
            Explore
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 font-body text-sm text-cream-100/80">
            <li><a href="#menu" className="hover:text-cream-50">Full Menu</a></li>
            <li><a href="#tiffins" className="hover:text-cream-50">Tiffin Subscriptions</a></li>
            <li><a href="#top" className="hover:text-cream-50">Back to Top</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-5 pt-6 md:px-8">
        <p className="font-body text-xs text-cream-100/50">
          © {new Date().getFullYear()} Chaar Chulha. Crafted with ghar ka pyaar, in Pune.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream-100 transition-colors hover:bg-gold-500 hover:text-charcoal-900"
    >
      {children}
    </a>
  );
}
