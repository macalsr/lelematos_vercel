"use client";

import { InstagramLogo } from "@phosphor-icons/react/dist/icons/InstagramLogo";
import { WhatsappLogo } from "@phosphor-icons/react/dist/icons/WhatsappLogo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteLogo } from "@/lib/sanity";

const links = [
  { label: "Galeria", href: "/#galeria" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

type SiteHeaderProps = {
  logoType?: "image" | "text";
  logoImage?: SiteLogo;
  logoText?: string;
  logoAlt?: string;
  instagram?: string;
  whatsapp?: string;
};

export function SiteHeader({ logoType, logoImage, logoText, logoAlt, instagram, whatsapp }: SiteHeaderProps) {
  const pathname = usePathname();
  const galleryIsActive = pathname === "/" || pathname.startsWith("/obras/");
  const instagramUrl = instagram || "https://www.instagram.com/";
  const whatsappUrl = whatsapp || "https://wa.me/";
  const resolvedLogoText = logoText || "Logo";
  const logoLabel = logoAlt || (logoText ? `${logoText}, início` : "Logo, início");
  const showImage = logoType === "image" && logoImage?.url && logoImage.width && logoImage.height;

  return (
    <header className="relative z-20 bg-[var(--canvas)]">
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-6 sm:px-8 sm:pb-8 md:pb-10 md:pt-10 lg:px-12">
        <Link
          href="/"
          className="block text-center text-[var(--ink)]"
          aria-label={logoLabel}
        >
          {showImage ? (
            <span className="relative left-1/2 block aspect-[2.45/1] w-screen -translate-x-1/2 overflow-hidden">
              <Image
                src={logoImage.url}
                alt={logoAlt || resolvedLogoText}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </span>
          ) : (
            <span className="block font-display text-[clamp(3.75rem,12vw,10rem)] font-medium leading-[0.78] tracking-[-0.1em]">
              {resolvedLogoText}
            </span>
          )}
        </Link>

        <nav aria-label="Navegação principal" className="mt-4 flex items-center justify-center gap-6 sm:mt-5 sm:gap-9 md:mt-6">
          {links.map((link) => {
            const isActive = link.label === "Galeria" && galleryIsActive;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-[12px] font-medium tracking-[0.04em] transition-colors hover:text-[var(--ink)] ${isActive ? "text-[var(--accent)]" : "text-[var(--ink-muted)]"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 flex items-center justify-center gap-4" aria-label="Redes sociais">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-[var(--ink-muted)] transition-colors hover:text-[var(--accent-blue)]"
          >
            <InstagramLogo size={17} weight="regular" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="text-[var(--ink-muted)] transition-colors hover:text-[var(--accent-blue)]"
          >
            <WhatsappLogo size={17} weight="regular" />
          </a>
        </div>
      </div>
    </header>
  );
}
