import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="bg-brand-brown-900 pb-8 pt-14 text-brand-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3 md:px-8">

        {/* Brand col */}
        <div>
          {/* Updated logo to match Navbar — emblem + text side by side */}
          <a href="#top" className="flex items-center gap-2.5">
            <Image
              src="/logo/logo-transparent.png"
              alt="Chaar Chulha Logo Emblem"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/logo/chaar_chulha_text_full.png"
              alt="Chaar Chulha Text Logo"
              width={130}
              height={36}
              className="h-7 w-auto -translate-y-[1px] brightness-[10]"
            />
          </a>
          <p id="story" className="mt-4 max-w-xs font-body text-sm leading-relaxed text-brand-cream/60">
            Food that feels like home. We started Chaar Chulha with one idea:
            Pune deserves meals that taste like they came from a family kitchen —
            cooked fresh, every single day.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href="https://instagram.com/chaarchulha_007" label="Follow on Instagram">
              <Instagram size={16} />
            </SocialLink>
          </div>
        </div>

        {/* Contact col */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Get in Touch
          </h3>
          <ul className="mt-4 flex flex-col gap-3 font-body text-sm text-brand-cream/70">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-brand-gold" />
              Pune, Maharashtra, India
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={15} className="mt-0.5 shrink-0 text-brand-gold" />
              <a href="mailto:orders@chaarchulha.com" className="transition-colors hover:text-white">
                orders@chaarchulha.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={15} className="mt-0.5 shrink-0 text-brand-gold" />
              <a href="https://wa.me/917888037948" className="transition-colors hover:text-white">
                +91 78880 37948 (WhatsApp orders)
              </a>
            </li>
          </ul>
        </div>

        {/* Explore col */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Explore
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 font-body text-sm text-brand-cream/70">
            <li><a href="#menu" className="transition-colors hover:text-white">Full Menu</a></li>
            <li><a href="#tiffins" className="transition-colors hover:text-white">Tiffin Subscriptions</a></li>
            <li><a href="#story" className="transition-colors hover:text-white">Our Story</a></li>
            <li><a href="#top" className="transition-colors hover:text-white">Back to Top</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-5 pt-6 md:px-8">
        <p className="font-body text-xs text-brand-cream/40">
          © {new Date().getFullYear()} Chaar Chulha. Crafted with ghar ka pyaar, in Pune.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-brand-cream/70 transition-all duration-200 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-brown-900"
    >
      {children}
    </a>
  );
}
