import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import Link from "next/link";

type SiteFooterProps = {
  instagram?: string;
  whatsapp?: string;
  contactTitle?: string;
  contactEmail?: string;
};

export function SiteFooter({ instagram, whatsapp, contactTitle, contactEmail }: SiteFooterProps) {
  const instagramUrl = instagram || "https://www.instagram.com/";
  const whatsappUrl = whatsapp || "https://wa.me/5500000000000";
  const email = contactEmail || "contato@lelematoos.art";

  return (
    <footer id="contato" className="border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_0.6fr] md:py-24 lg:px-12">
        <div>
          <h2 className="max-w-[9ch] font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.08em]">{contactTitle || "Vamos conversar sobre uma obra."}</h2>
          <a href={`mailto:${email}`} className="mt-8 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1.5 text-[14px] text-[var(--ink)] transition-colors hover:text-[var(--accent)]">
            {email} <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="flex flex-col justify-between gap-10 md:items-end">
          <div className="flex gap-4">
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[var(--ink-muted)] hover:text-[var(--accent-blue)]"><InstagramLogo size={21} /></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-[var(--ink-muted)] hover:text-[var(--accent-blue)]"><WhatsappLogo size={21} /></a>
          </div>
          <div className="flex flex-col gap-3 text-[12px] text-[var(--ink-muted)] md:items-end">
            <Link href="/#galeria" className="hover:text-[var(--ink)]">Galeria</Link>
            <Link href="/#sobre" className="hover:text-[var(--ink)]">Sobre</Link>
            <Link href="/#contato" className="hover:text-[var(--ink)]">Contato</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] justify-between border-t border-[var(--line)] px-5 py-5 font-mono text-[10px] text-[var(--ink-muted)] sm:px-8 lg:px-12">
        <span>Lelematoos</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
