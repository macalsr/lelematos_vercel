import Link from "next/link";
import { GalleryGrid } from "@/components/gallery-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings, getWorks } from "@/lib/sanity";

export const revalidate = 60;

export default async function HomePage() {
  const [works, siteSettings] = await Promise.all([getWorks(), getSiteSettings()]);

  return (
    <main>
      <SiteHeader
        logoType={siteSettings?.logoType}
        logoImage={siteSettings?.logoImage}
        logoText={siteSettings?.logoText}
        logoAlt={siteSettings?.logoAlt}
        instagram={siteSettings?.instagram}
        whatsapp={siteSettings?.whatsapp}
      />

      <section id="galeria" className="scroll-mt-8 pb-24 md:pb-40">
        <h1 className="sr-only">Galeria de obras</h1>
        <GalleryGrid works={works} />
      </section>

      <section id="sobre" className="scroll-mt-8 border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-8 md:py-40 lg:px-12">
          <div className="max-w-[760px]">
            <h2 className="max-w-[8ch] font-display text-[clamp(3rem,7vw,7rem)] leading-[0.87] tracking-[-0.09em]">{siteSettings?.aboutTitle || "Título da seção Sobre"}</h2>
            <div className="mt-10 max-w-[49ch] space-y-5 text-[15px] leading-7 text-[var(--ink-muted)]">
              <p>{siteSettings?.aboutIntro || "Texto da seção Sobre"}</p>
              <p>{siteSettings?.aboutDetails || "Informações da seção Sobre"}</p>
            </div>
            <Link href="#contato" className="mt-9 inline-flex border-b border-[var(--accent)] pb-1.5 text-[13px] text-[var(--ink)] transition-colors hover:text-[var(--accent)]">Contato</Link>
          </div>
        </div>
      </section>

      <SiteFooter
        instagram={siteSettings?.instagram}
        whatsapp={siteSettings?.whatsapp}
        contactTitle={siteSettings?.contactTitle}
        contactEmail={siteSettings?.contactEmail}
        logoText={siteSettings?.logoText}
      />
    </main>
  );
}
