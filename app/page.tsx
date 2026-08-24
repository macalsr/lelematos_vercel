import Link from "next/link";
import { GalleryGrid } from "@/components/gallery-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings, getWorks } from "@/lib/sanity";

export default async function HomePage() {
  const [works, siteSettings] = await Promise.all([getWorks(), getSiteSettings()]);

  return (
    <main>
      <SiteHeader logo={siteSettings?.logo} instagram={siteSettings?.instagram} whatsapp={siteSettings?.whatsapp} />

      <section id="galeria" className="scroll-mt-8 pb-24 md:pb-40">
        <h1 className="sr-only">Galeria de obras de Lelematoos</h1>
        <GalleryGrid works={works} />
      </section>

      <section id="sobre" className="scroll-mt-8 border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-8 md:py-40 lg:px-12">
          <div className="max-w-[760px]">
            <h2 className="max-w-[8ch] font-display text-[clamp(3rem,7vw,7rem)] leading-[0.87] tracking-[-0.09em]">{siteSettings?.aboutTitle || "O trabalho começa no olhar."}</h2>
            <div className="mt-10 max-w-[49ch] space-y-5 text-[15px] leading-7 text-[var(--ink-muted)]">
              <p>{siteSettings?.aboutIntro || "Lelematoos pesquisa a tensão entre matéria e espaço. Seu trabalho atravessa pintura, desenho e fotografia para construir imagens abertas, onde a forma nunca termina de chegar."}</p>
              <p>{siteSettings?.aboutDetails || "O ateliê fica em São Paulo. Para ver uma obra de perto, solicitar catálogo ou conversar sobre uma aquisição, escreva para o ateliê."}</p>
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
      />
    </main>
  );
}
